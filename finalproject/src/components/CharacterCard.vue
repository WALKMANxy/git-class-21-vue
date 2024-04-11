<template>
  <!-- Root element of the character card component -->
  <div class="character-card" @click="navigateToDetail(character.id)">
    <!-- Character image with dynamic source binding -->
    <img :src="character.image" alt="Character image" class="character-image" />
    <!-- Displays character's name -->
    <h2>{{ character.name }}</h2>
    <!-- Displays character's status -->
    <p><strong>Status:</strong> {{ character.status }}</p>
    <!-- Displays character's species -->
    <p><strong>Species:</strong> {{ character.species }}</p>
    <!-- Displays character's gender -->
    <p><strong>Gender:</strong> {{ character.gender }}</p>
    <!-- Displays character's origin location name -->
    <p><strong>First seen in:</strong> {{ character.origin.name }}</p>
  </div>
</template>

<script setup lang="ts">
// Importing useRouter from vue-router to programatically navigate to different routes
import { useRouter } from "vue-router";
// Import the Character type from the model for TypeScript type checking
import type { Character } from "@/models/Character"; // Adjust the path as necessary

// Defining component props using the defineProps function provided by Vue
const props = defineProps({
  character: {
    type: Object as () => Character, // Specifying the type of the prop as Character for type checking
    required: true // This prop is required for the component to function properly
  }
});

// Initialize the router instance to use for navigation
const router = useRouter();

// Function to navigate to the character detail page, taking a character ID as argument
function navigateToDetail(id: number) {
  router.push({ name: "CharacterDetail", params: { id } }); // Using the router to navigate to CharacterDetail route with params
}
</script>

<style scoped>
/* Scoped styles specific to this component */
.character-card {
  cursor: pointer; /* Changes the cursor to pointer to indicate the element is clickable */
  border-radius: 20px; /* Rounds the corners of the card */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Adds a slight shadow for depth */
  padding: 20px; /* Adds padding inside the card */
  text-align: center; /* Centers the text inside the card */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease; /* Smooths the transition for hover effects */
}

.character-card:hover {
  transform: translateY(-5px); /* Moves the card up slightly on hover for a lift effect */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Increases shadow on hover for emphasis */
}

.character-image {
  max-width: 100%; /* Ensures the image is fully contained within its parent */
  border-radius: 15px; /* Rounds the corners of the image */
  margin-bottom: 1rem; /* Adds space between the image and the text below */
}
</style>
