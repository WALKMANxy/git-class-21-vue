<template>
  <div id="app">
    <Navbar />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/NavbarComponent.vue";
</script>

<style scoped></style>
