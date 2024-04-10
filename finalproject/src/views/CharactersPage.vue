<template>
  <div>
    <!-- Pagination Controls -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="page => fetchApiData(page, searchQuery)"
    />
    
    <!-- Loading Indicator -->
    <div v-if="isLoading">Loading...</div>
    
    <!-- Error Message Display -->
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    
    <!-- Characters Display -->
    <div v-else class="characters-container">
      <CharacterCard
        v-for="character in data?.results"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCharacters as fetchCharactersApi } from '@/api/rickAndMortyApi';
import type { CharacterResponse } from '@/models/Character';
import CharacterCard from '@/components/CharacterCard.vue';
import Pagination from '@/components/PaginationComp.vue';

export default defineComponent({
  components: {
    CharacterCard,
    Pagination,
  },
  setup() {
    const state = reactive({
      characters: {} as CharacterResponse,
      currentPage: 1,
      totalPages: 0,
      errorMessage: '', // Include an error message state
    });

    const route = useRoute();

    async function fetchCharacters(page: number = state.currentPage, searchQuery?: string) {
      try {
        const response = await fetchCharactersApi(page, searchQuery);
        if (response === 'NOT_FOUND') {
          state.characters = { results: [] }; // Adjust as needed
          state.totalPages = 0;
          state.errorMessage = 'No item found with that name!';
        } else {
          state.characters = response;
          state.totalPages = response.info?.pages || 0;
          state.errorMessage = ''; // Reset error message on successful fetch
        }
        state.currentPage = page;
      } catch (error: unknown) {
        console.error("Failed to fetch characters:", error);
        if (error instanceof Error) {
      state.errorMessage = error.message;
    } else {
      state.errorMessage = 'An unexpected error occurred';
    }
  }
}

    // Trigger fetch on mount and when route.query.search changes
    onMounted(() => {
      fetchCharacters(state.currentPage, route.query.search as string);
    });

    watch(() => route.query.search, (newSearchQuery) => {
      fetchCharacters(state.currentPage, newSearchQuery as string);
    });

    return { ...toRefs(state), fetchCharacters };
  },
});
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
