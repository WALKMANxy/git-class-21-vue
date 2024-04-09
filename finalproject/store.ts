import { reactive, ref } from "vue";

export const offset = ref<number>(0);
export const offsetValue = 20;
export const maxNumber = 1301;

export const store = reactive({
  offset
});
