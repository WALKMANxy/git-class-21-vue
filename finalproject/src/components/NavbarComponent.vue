<template>
  <!-- Root container for the navbar -->
  <div class="navbar">
    <!-- Static title for the navbar -->
    <div class="navbar-title">RICK AND MORTY API</div>
    <!-- Conditionally display the search input based on showSearchBar -->
    <div v-if="showSearchBar" class="navbar-search">
      <!-- Search input field, bound to searchQuery. Debounces input. -->
      <input
        type="text"
        placeholder="Type here to search..."
        v-model="searchQuery"
        @input="debounceSearch"
      />
    </div>
    <!-- Conditionally display a link to the homepage based on showHomeLink -->
    <div v-if="showHomeLink" class="navbar-action">
      <!-- Vue Router link to the home route -->
      <router-link to="/" class="home-link">Home</router-link>
    </div>
  </div>
</template>

<script>
// Importing Vue composition API functions and Vue Router hooks
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    // Reactive state for the search query input
    const searchQuery = ref("");
    // Hooks to interact with the router and the current route
    const route = useRoute();
    const router = useRouter();

    // Computed property to determine if the search bar should be shown
    const showSearchBar = computed(() => route.path === "/characters");
    // Computed property to determine if the home link should be shown
    const showHomeLink = computed(() => route.path !== "/");

    // Debounce function to limit how often we call the search function
    const debounceSearch = (() => {
      let timer = null;
      return () => {
        clearTimeout(timer); // Clear the previous timer
        timer = setTimeout(() => {
          // Set a new timer
          if (searchQuery.value.trim()) {
            // If there is a search query, navigate to the current path with the search query as a parameter
            router.replace({ path: route.path, query: { search: searchQuery.value } });
          } else {
            // If the search query is empty, just navigate to the current path
            router.replace({ path: route.path });
          }
        }, 500); // Wait 500ms after the user stops typing to execute
      };
    })();

    // Watch the route to reset the searchQuery when navigating to specific routes
    watch(route, () => {
      if (["/episodes", "/locations", "/character/:id"].includes(route.path)) {
        searchQuery.value = "";
      }
    });

    return { searchQuery, showSearchBar, showHomeLink, debounceSearch };
  }
};
</script>

<style scoped>
/* Scoped styles for the navbar */

/* Apply box-sizing: border-box to the navbar and all its children */
.navbar,
.navbar * {
  box-sizing: border-box;
}

/* Style for the navbar container */
.navbar {
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Space out children evenly */
  align-items: center; /* Vertically center children */
  padding: 10px 20px; /* Padding around the content */
  background-color: #333; /* Dark background color */
  color: #fff; /* Light text color */
  position: fixed; /* Fix position at the top of the viewport */
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  z-index: 1000; /* Ensure it's above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow for depth */
}

/* Style for the title and action sections of the navbar */
.navbar-title,
.navbar-action {
  flex: 1; /* Flex grow to fill available space */
  display: flex;
  justify-content: center; /* Center content horizontally */
}

/* Style for the search input container */
.navbar-search {
  flex: 2; /* Allow the search bar to take up more space */
  input {
    width: 100%; /* Full width of its container */
    padding: 8px 16px; /* Padding inside the input */
    border-radius: 20px; /* Rounded corners */
    border: none; /* Remove default border */
    outline: none; /* Remove focus outline */
    transition: all 0.3s ease; /* Smooth transition for focus changes */
    &:focus {
      background-color: #fff; /* Light background on focus */
      color: #333; /* Dark text on focus */
    }
    &::placeholder {
      color: #aaa; /* Lighter color for placeholder text */
    }
  }
}

/* Style for action items and links in the navbar */
.navbar-action,
.home-link {
  cursor: pointer; /* Change cursor to indicate clickable */
  font-size: 20px; /* Larger text for better visibility */
  text-decoration: none; /* Remove underline from links */
  color: #fff; /* Light text color */
  &:hover {
    color: #ffd700; /* Change color on hover for visual feedback */
  }
}

/* Additional styling for the home link */
.home-link {
  background-color: #007bff; /* Blue background color */
  color: #fff; /* Light text color */
  padding: 8px 16px; /* Padding around the text */
  border-radius: 20px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition for background color changes */
  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
}
</style>
