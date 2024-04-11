<template>
  <!-- Root container for the home page -->
  <div class="home-page">
    <!-- Displays the application logo -->
    <img src="/logo.png" alt="Logo" class="logo" />
    <!-- Subtitle or tagline of the application -->
    <h2 class="subtitle">Rick and Morty API _ TESTAPP</h2>
    <!-- Navigation menu -->
    <nav>
      <ul>
        <!-- List item containing a router-link to the characters page -->
        <li>
          <router-link to="/characters">Characters</router-link>
        </li>
        <!-- List item containing a router-link to the locations page -->
        <li>
          <router-link to="/locations">Locations</router-link>
        </li>
        <!-- List item containing a router-link to the episodes page -->
        <li>
          <router-link to="/episodes">Episodes</router-link>
        </li>
        <!-- List item containing a router-link to an extra memory game feature -->
        <li>
          <router-link to="/extra-memory">Memory Game</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
// This script setup block is intentionally left blank.
// Additional interactivity can be added here as needed.
</script>

<style scoped lang="scss">
/* Scoped SCSS for styling the home-page component */
.home-page {
  display: flex; /* Uses Flexbox for layout */
  flex-direction: column; /* Stacks children vertically */
  align-items: center; /* Centers children horizontally */
  justify-content: center; /* Centers children vertically */
  min-height: 100vh; /* Ensures the component fills at least the full height of the viewport */
  background-color: #f0f0f0; /* Light grey background color */
  text-align: center; /* Centers text horizontally */

  .logo {
    max-width: 80%; /* Limits logo width, adjust based on actual logo size */
  }

  .subtitle {
    font-size: 1.5rem; /* Subtitle text size */
    margin-bottom: 3rem; /* Space below the subtitle */
    color: #333; /* Dark grey text color */
    font-weight: bold; /* Bold text */
  }

  nav {
    ul {
      list-style: none; /* Removes bullet points from the list */
      padding: 0; /* Removes default padding */
      display: flex; /* Uses Flexbox for layout */
      flex-direction: column; /* Stacks list items vertically */
      gap: 1rem; /* Space between list items */

      li {
        width: 100%; /* Each list item fills the width of its parent */
        max-width: 320px; /* Maximum width of list items */

        a {
          display: block; /* Makes the link fill the area of the list item */
          background-color: #6200ea; /* Vibrant purple background color */
          color: #ffffff; /* White text color */
          padding: 0.75rem 1.5rem; /* Padding inside the link */
          border: none; /* Removes default border */
          border-radius: 5px; /* Rounded corners */
          text-decoration: none; /* Removes underline from links */
          font-size: 1rem; /* Text size */
          font-weight: bold; /* Bold text */
          transition:
            background-color 0.3s,
            /* Smooth transition for background color */ transform 0.2s; /* Smooth transition for transform effect */

          /* Hover and focus styles for links */
          &:hover,
          &:focus {
            background-color: #3700b3; /* Darker purple background color on hover/focus */
            transform: translateY(-3px); /* Moves the link up slightly */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Adds shadow for depth */
          }
        }
      }
    }
  }
}
</style>
