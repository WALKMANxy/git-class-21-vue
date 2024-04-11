// Import axios for making HTTP requests and the CharacterResponse type for TypeScript typing.
import axios from "axios";
import type { CharacterResponse } from "../models/Character";

// Define the base URL for the Rick and Morty characters API.
const baseURL = "https://rickandmortyapi.com/api/character";

// Define an asynchronous function to fetch characters from the API.
// The function accepts a page number (defaulting to 1) and an optional search query string.
export const fetchCharacters = async (
  page: number = 1,
  searchQuery?: string
): Promise<CharacterResponse | "NOT_FOUND"> => {
  // Create a URL object based on the baseURL.
  const url = new URL(baseURL);
  // Append the 'page' query parameter to the URL, converting the page number to a string.
  url.searchParams.append("page", String(page));
  // If a search query is provided, append the 'name' query parameter with the search query value.
  if (searchQuery) {
    url.searchParams.append("name", searchQuery);
  }

  try {
    // Use axios to perform a GET request to the constructed URL.
    // The response is expected to match the CharacterResponse TypeScript type.
    const response = await axios.get<CharacterResponse>(url.href);
    // If the request is successful, return the data portion of the response.
    return response.data;
  } catch (error) {
    // If the request results in an error, check if it's an AxiosError.
    if (axios.isAxiosError(error)) {
      // Log the error message to the console for debugging purposes.
      console.error("Axios error:", error.message);
      // If the error response status is 404 (Not Found), return "NOT_FOUND"
      // indicating no characters matched the search query.
      if (error.response?.status === 404) {
        return "NOT_FOUND";
      }
      // For Axios errors not related to a 404 response, throw a new Error with the Axios error message.
      throw new Error(error.message);
    } else {
      // If the error is not an AxiosError, log it as an unexpected error and throw a generic error message.
      console.error("Unexpected error:", error);
      throw new Error("Failed to fetch characters");
    }
  }
};

// Define an asynchronous function to fetch details of a character by their ID.
export async function fetchCharacterById(id: number) {
  try {
    // Use the Fetch API to perform a GET request to the API URL with the character's ID appended.
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    // Parse the JSON response and return it.
    return response.json();
  } catch (error) {
    // If the request results in an error, log the error and throw a new Error indicating the failure to fetch character details.
    console.error("Failed to fetch character details:", error);
    throw new Error("Failed to fetch character details");
  }
}
