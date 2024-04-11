<template>
  <div>
    <!-- Renders pagination controls, binding currentPage and totalPages from the script setup. -->
    <!-- @update:currentPage listens for the custom event emitted by the Pagination component to update the currentPage. -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="(page) => fetchApiData(page, searchQuery)"
    />

    <!-- Shows a loading message while data is being fetched. -->
    <div v-if="isLoading">Loading...</div>

    <!-- Shows an error message if one occurred during data fetching. -->
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <!-- Renders a list of CharacterCard components if data is loaded successfully and no error occurred. -->
    <!-- Uses optional chaining (?.) to safely access the results array from the data object. -->
    <div v-else class="characters-container">
      <CharacterCard
        v-for="character in data?.results"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Importing Vue Composition API functions and the Vue Router's useRoute function.
import { onMounted, watch, ref, computed } from "vue";
import { useRoute } from "vue-router";

// Importing the custom composable function and components.
import { useRickAndMortyApi } from "@/composables/useRickAndMortyApi";
import CharacterCard from "@/components/CharacterCard.vue";
import Pagination from "@/components/PaginationComp.vue";

// Using the Vue Router's useRoute function to access the current route object.
const route = useRoute();

// Initializing the custom composable to fetch character data from the Rick and Morty API.
const { data, errorMessage, isLoading, fetchApiData } = useRickAndMortyApi(
  "https://rickandmortyapi.com/api/character"
);

// A reactive reference for storing the current search query.
const searchQuery = ref("");

// Fetching character data when the component is mounted.
onMounted(() => {
  fetchApiData(1, searchQuery.value);
});

// Watching for changes in the search query parameter in the URL.
// When it changes, the searchQuery ref is updated, and new character data is fetched based on the new search query.
watch(
  () => route.query.search,
  (newSearchQuery) => {
    searchQuery.value = newSearchQuery as string;
    fetchApiData(1, searchQuery.value);
  }
);

// Pagination controls: currentPage is a reactive reference to track the current page.
const currentPage = ref(1);
// totalPages is a computed property that derives its value from the pages information in the fetched data.
// If data.value?.info?.pages is undefined, it defaults to 0.
const totalPages = computed(() => data.value?.info?.pages || 0);
</script>

<style scoped>
.characters-container {
  padding-top: 120px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.error-message {
  padding-top: 120px;
  text-align: center;
  color: red;
}
</style>
