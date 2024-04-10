<template>
  <div class="pagination">
    <button class="arrow-btn" @click="changePage(currentPage! - 1)" :disabled="currentPage! <= 1">
      &#8592;
    </button>
    <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      class="arrow-btn"
      @click="changePage(currentPage! + 1)"
      :disabled="currentPage! >= totalPages!"
    >
      &#8594;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentPage: Number,
    totalPages: Number
  },
  emits: ["update:currentPage"],
  methods: {
    changePage(newPage: number) {
      if (newPage >= 1 && newPage <= this.totalPages!) {
        this.$emit("update:currentPage", newPage);
      }
    }
  }
});
</script>

<style scoped>
.pagination {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 0;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.arrow-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin: 0 10px;
  padding: 5px;
  color: #555;
  transition: color 0.3s ease;
}

.arrow-btn:hover {
  color: #000;
}

.arrow-btn:disabled {
  cursor: not-allowed;
  color: #ccc;
}

.page-info {
  font-size: 16px;
  margin: 0 10px;
}
</style>
