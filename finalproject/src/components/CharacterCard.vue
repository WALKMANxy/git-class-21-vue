<template>
  <div class="character-card" @click="navigateToDetail(character.id)">
    <img :src="character.image" alt="Character image" class="character-image" />
    <h2>{{ character.name }}</h2>
    <p><strong>Status:</strong> {{ character.status }}</p>
    <p><strong>Species:</strong> {{ character.species }}</p>
    <p><strong>Gender:</strong> {{ character.gender }}</p>
    <p><strong>First seen in:</strong> {{ character.origin.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Character } from "@/models/Character"; // Adjust the path as necessary

// Define props using the `defineProps` macro for <script setup>
const props = defineProps({
  character: {
    type: Object as () => Character,
    required: true
  }
});

const router = useRouter();

function navigateToDetail(id: number) {
  router.push({ name: "CharacterDetail", params: { id } });
}
</script>

<style scoped>
.character-card {
  cursor: pointer; /* Indicates the card is clickable */
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease; /* Smooth transition for interaction */
}

.character-card:hover {
  transform: translateY(-5px); /* Slight lift effect on hover */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.character-image {
  max-width: 100%;
  border-radius: 15px;
  margin-bottom: 1rem; /* Adds some spacing between the image and text */
}
</style>
