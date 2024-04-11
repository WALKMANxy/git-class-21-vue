<script setup lang="ts">
// Importing necessary utilities from Vue and Vue Router, and the API call function.
import { onMounted, ref } from "vue"; // `onMounted` is a lifecycle hook, `ref` is for reactivity.
import { useRoute } from "vue-router"; // Used to access the current route and its parameters.
import { fetchCharacterById } from "@/api/rickAndMortyApi"; // Function to fetch character details by ID.
import type { Character } from "@/models/Character"; // TypeScript type import for Character.

// Accessing the current route to extract parameters from the URL.
const route = useRoute();
// Declaring a reactive reference to store the character details. Initially null.
const character = ref<Character | null>(null);

// Lifecycle hook that runs after the component has been mounted to the DOM.
onMounted(async () => {
  // Extracting the `id` parameter from the route.
  const id = route.params.id;
  // Ensuring the `id` is a string before converting to number and fetching character details.
  if (typeof id === "string") {
    character.value = await fetchCharacterById(Number(id)); // Fetch and store the character details.
  }
});
</script>

<template>
  <!-- Rendering character details only if the character data is available -->
  <div class="character-detail" v-if="character">
    <!-- Using optional chaining (?.) to safely access character properties -->
    <h1>{{ character?.name }}</h1>
    <!-- Displaying character image; using `character?.image` as source -->
    <img :src="character?.image" :alt="character?.name" class="character-image" />
    <!-- Displaying character status -->
    <p><strong>Status:</strong> {{ character?.status }}</p>
    <!-- Displaying character species -->
    <p><strong>Species:</strong> {{ character?.species }}</p>
    <!-- Displaying character gender -->
    <p><strong>Gender:</strong> {{ character?.gender }}</p>
    <!-- More properties like location, episodes etc. can be added here -->
  </div>
</template>

<style scoped>
/* Scoped styles - these styles will only apply to this component */
.character-detail {
  max-width: 800px; /* Limiting width of the detail view */
  margin: auto; /* Centering the detail view horizontally */
  text-align: center; /* Aligning text to the center */
}

.character-image {
  width: 100%; /* Making image responsive */
  max-width: 400px; /* Limiting image width while maintaining aspect ratio */
  border-radius: 20px; /* Rounded corners for the image */
}
</style>
