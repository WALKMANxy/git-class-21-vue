<template>
  <div class="navbar">
    <div class="navbar-title">RICK AND MORTY API</div>
    <div v-if="showSearchBar" class="navbar-search">
      <input
        type="text"
        placeholder="Type here to search..."
        v-model="searchQuery"
        @input="debounceSearch"
      />
    </div>
    <div v-if="showHomeLink" class="navbar-action">
      <router-link to="/" class="home-link">Home</router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineComponent } from "vue";

export default {
  setup() {
    const searchQuery = ref("");
    const route = useRoute();
    const router = useRouter();

    const showSearchBar = computed(() => route.path === "/characters");
    const showHomeLink = computed(() => route.path !== "/");

    const debounceSearch = (() => {
      let timer = null;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (searchQuery.value.trim()) {
            router.replace({ path: route.path, query: { search: searchQuery.value } });
          } else {
            router.replace({ path: route.path });
          }
        }, 500);
      };
    })();

    watch(route, () => {
      // Reset searchQuery when navigating to specific routes
      if (["/episodes", "/locations", "/character/:id"].includes(route.path)) {
        searchQuery.value = "";
      }
    });

    return { searchQuery, showSearchBar, showHomeLink, debounceSearch };
  }
};
</script>

<style scoped>
/* Navbar.scss */
.navbar,
.navbar * {
  box-sizing: border-box;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.navbar-title,
.navbar-action {
  flex: 1;
  display: flex;
  justify-content: center;
}

.navbar-search {
  flex: 2;
  input {
    width: 100%;
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    &:focus {
      background-color: #fff;
      color: #333;
    }
    &::placeholder {
      color: #aaa;
    }
  }
}

.navbar-action,
.home-link {
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #ffd700;
  }
}

.home-link {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
}
</style>
