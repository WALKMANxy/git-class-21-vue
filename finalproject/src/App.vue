<template>
  <!-- Root container of the Vue application -->
  <div id="app">
    <!-- Navbar component included at the top of every page -->
    <Navbar />

    <!-- RouterView is a functional component that renders the matched component for the given route -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
// Importing RouterView for rendering the current route's component
import { RouterView } from "vue-router";

// Importing the Navbar component to be used across the application
import Navbar from "./components/NavbarComponent.vue";
</script>

<style scoped>
/* Scoped CSS styles.
   Since there are no styles defined here, this section is effectively placeholder.
   Scoped means any styles defined here would apply only to this component, 
   preventing unintended effects on other components. */
</style>
