<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchCharacterById } from "@/api/rickAndMortyApi";
import type { Character } from "@/models/Character";

const route = useRoute();
const character = ref<Character | null>(null);

onMounted(async () => {
  const id = route.params.id;
  if (typeof id === "string") {
    character.value = await fetchCharacterById(Number(id));
  }
});
</script>

<template>
  <div class="character-detail" v-if="character">
    <h1>{{ character?.name }}</h1>
    <img :src="character?.image" :alt="character?.name" class="character-image" />
    <p><strong>Status:</strong> {{ character?.status }}</p>
    <p><strong>Species:</strong> {{ character?.species }}</p>
    <p><strong>Gender:</strong> {{ character?.gender }}</p>
    <!-- More properties can be safely accessed here -->
  </div>
</template>

<style scoped>
.character-detail {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.character-image {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
}
</style>
