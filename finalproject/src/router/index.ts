import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CharacterDetailPage from '@/views/CharacterDetailPage.vue'; // Make sure to create this component

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/character/:id', name: 'CharacterDetail', component: CharacterDetailPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;