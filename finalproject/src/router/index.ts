import { createRouter, createWebHistory } from "vue-router";
import CharactersPage from "@/views/CharactersPage.vue";
import CharacterDetailPage from "@/views/CharacterDetailPage.vue"; // Make sure to create this component
import HomePage from "@/views/HomePage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/Characters", name: "Characters", component: CharactersPage },
  { path: "/character/:id", name: "CharacterDetail", component: CharacterDetailPage }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
