// Importing only the types needed from Vue, keeping the import statement lightweight
import type { Ref } from "vue";
// Importing the `ref` function from Vue, used to create reactive references
import { ref } from "vue";
// Importing axios, a promise-based HTTP client for making requests to the API
import axios from "axios";
// Importing the type definition for the API response
import type { CharacterResponse } from "../models/Character";

// Defining the return type of the composable function for better TypeScript support
interface UseRickAndMortyApiReturn {
  data: Ref<CharacterResponse | null>; // Reactive reference to store the fetched data or null if not fetched or an error occurs
  errorMessage: Ref<string>; // Reactive reference to store error messages
  isLoading: Ref<boolean>; // Reactive reference to track the loading state
  fetchApiData: (page: number, searchQuery?: string) => Promise<void>; // Function to fetch data from the API
}

// The main composable function that provides a reusable logic for fetching data from the Rick and Morty API
export function useRickAndMortyApi(baseUrl: string): UseRickAndMortyApiReturn {
  // Creating reactive state references
  const data = ref<CharacterResponse | null>(null); // Initially, no data is loaded
  const errorMessage = ref<string>(""); // Initially, there are no error messages
  const isLoading = ref<boolean>(false); // Initially, not loading

  // The function to fetch data from the API, async to use await syntax for Promises
  const fetchApiData = async (page: number = 1, searchQuery?: string) => {
    isLoading.value = true; // Start loading
    errorMessage.value = ""; // Reset error message
    const url = new URL(baseUrl); // Constructing the URL from the base URL passed as an argument
    url.searchParams.append("page", String(page)); // Adding the page number to the URL's query parameters
    if (searchQuery) {
      // If a search query is provided, add it to the URL's query parameters
      url.searchParams.append("name", searchQuery);
    }

    try {
      // Try to fetch data from the API
      const response = await axios.get<CharacterResponse>(url.href); // Await the response from axios
      data.value = response.data; // If successful, store the response data
      isLoading.value = false; // Data has been loaded, stop loading
    } catch (error) {
      // If an error occurs during the fetch
      if (axios.isAxiosError(error)) {
        // Check if the error is an AxiosError to access error details
        if (error.response?.status === 404) {
          // If the error status is 404, set a specific error message
          errorMessage.value = "No item found with that name!";
        } else {
          // For other Axios errors, use the error message from axios or a default message
          errorMessage.value = error.message || "An unexpected error occurred";
        }
      }
      isLoading.value = false; // Stop loading because of the error
      data.value = null; // Clear the data because of the error
    }
  };

  // Return the reactive state and the fetchApiData function
  // This allows any component using this composable to access and react to changes in these values
  return { data, errorMessage, isLoading, fetchApiData };
}
