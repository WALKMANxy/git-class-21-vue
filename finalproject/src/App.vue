<template>
  <div id="app">
    <header>
      <nav>
        <div class="nav-item">
          <RouterLink to="/" class="navbar-link">Home</RouterLink>
        </div>
        <div class="logo-title-container">
          <img src="/logo.png" alt="Logo" class="logo" />
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
header {
  background-color: #343a40;
  padding: 1rem;
}

nav a {
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;
}

main {
  padding: 1rem;
}

.nav-item {
   /* Ensure the container takes only the necessary width */
  margin-right: 10px;
}

.navbar-link {
  background-color: #2979ff; /* Darker hue of blue */
  border-radius: 10px; /* Rounded corners */
  padding: 8px 16px; /* Adjust padding for button size */
}

.navbar-title {
  color: white;
  text-decoration: none; /* Remove underline from links */
  font-size: 1.5rem;
}

.logo-title-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 150px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px;

}
</style>
