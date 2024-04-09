<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  emits: ['update:currentPage'], 
  methods: {
    changePage(newPage: number) {
      this.$emit('update:currentPage', newPage); 
    },
  },
});
</script>
<template>
    <div class="pagination">
      
      <button @click="changePage(currentPage! - 1)" :disabled="currentPage! <= 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage! + 1)" :disabled="currentPage! >= totalPages!">Next</button>
    </div>
</template>

  
  
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }
  </style>
  