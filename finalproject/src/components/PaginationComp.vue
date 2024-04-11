<template>
  <!-- Root element for the pagination component -->
  <div class="pagination">
    <!-- Button to go to the previous page -->
    <!-- The '!' operator after `currentPage` asserts that `currentPage` is not null or undefined -->
    <button class="arrow-btn" @click="changePage(currentPage! - 1)" :disabled="currentPage! <= 1">
      &#8592;
      <!-- Left arrow HTML entity for button text -->
    </button>
    <!-- Displays the current page and the total number of pages -->
    <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
    <!-- Button to go to the next page -->
    <!-- Disables the button if on the last page -->
    <button
      class="arrow-btn"
      @click="changePage(currentPage! + 1)"
      :disabled="currentPage! >= totalPages!"
    >
      &#8594;
      <!-- Right arrow HTML entity for button text -->
    </button>
  </div>
</template>

<script lang="ts">
// Importing Vue's defineComponent function to create a component definition
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentPage: Number, // Prop to track the current page number
    totalPages: Number // Prop for the total number of pages
  },
  emits: ["update:currentPage"], // Component emits this event to update the current page
  methods: {
    // Method to change the page, emitting an event with the new page number
    changePage(newPage: number) {
      // Checks if the newPage is within valid range before emitting
      if (newPage >= 1 && newPage <= this.totalPages!) {
        this.$emit("update:currentPage", newPage); // Emits the `update:currentPage` event
      }
    }
  }
});
</script>

<style scoped>
/* Scoped CSS for pagination component */
.pagination {
  position: fixed; /* Fixes the pagination bar at a specific position */
  top: 60px; /* Distance from the top of the viewport */
  left: 0;
  right: 0;
  display: flex; /* Uses Flexbox for layout */
  justify-content: center; /* Centers the children horizontally */
  align-items: center; /* Centers the children vertically */
  background-color: #f0f0f0; /* Background color of the pagination bar */
  padding: 10px 0; /* Padding around the pagination bar */
  z-index: 999; /* Ensures the bar is layered above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adds a shadow for depth */
}

.arrow-btn {
  background-color: transparent; /* Transparent background for arrows */
  border: none; /* Removes border */
  cursor: pointer; /* Changes the cursor to a pointer to indicate clickability */
  font-size: 20px; /* Size of the arrow text */
  margin: 0 10px; /* Margin around the buttons */
  padding: 5px; /* Padding inside the buttons */
  color: #555; /* Color of the arrow text */
  transition: color 0.3s ease; /* Transition effect for color change */
}

.arrow-btn:hover {
  color: #000; /* Color change on hover */
}

.arrow-btn:disabled {
  cursor: not-allowed; /* Changes cursor to indicate the button is disabled */
  color: #ccc; /* Color for disabled state */
}

.page-info {
  font-size: 16px; /* Size of the page info text */
  margin: 0 10px; /* Margin around the text */
}
</style>
