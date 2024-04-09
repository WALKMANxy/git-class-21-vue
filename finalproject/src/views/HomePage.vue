<template>
  <div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="fetchCharacters"
    />
    <h1>Rick and Morty Characters</h1>
    <div class="characters-container">
      <CharacterCard
        v-for="character in characters.results"
        :key="character.id"
        :character="character"
      />
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
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
    });

    async function fetchCharacters(page: number = state.currentPage) {
      try {
        const response = await fetchCharactersApi(page);
        state.characters = response;
        state.totalPages = response.info.pages;
        state.currentPage = page;
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    }

    onMounted(() => {
      fetchCharacters();
    });

    return { ...toRefs(state), fetchCharacters };
  },
});
</script>

<style scoped>
.characters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Additional styling can go here */
</style>
