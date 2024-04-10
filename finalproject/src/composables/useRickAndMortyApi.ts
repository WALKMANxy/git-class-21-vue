// useRickAndMortyApi.ts
import type {Ref} from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import type { CharacterResponse } from '../models/Character';

interface UseRickAndMortyApiReturn {
  data: Ref<CharacterResponse | null>;
  errorMessage: Ref<string>;
  isLoading: Ref<boolean>;
  fetchApiData: (page: number, searchQuery?: string) => Promise<void>;
}

export function useRickAndMortyApi(baseUrl: string): UseRickAndMortyApiReturn {
  const data = ref<CharacterResponse | null>(null);
  const errorMessage = ref<string>('');
  const isLoading = ref<boolean>(false);

  const fetchApiData = async (page: number = 1, searchQuery?: string) => {
    isLoading.value = true;
    errorMessage.value = '';
    const url = new URL(baseUrl);
    url.searchParams.append('page', String(page));
    if (searchQuery) {
      url.searchParams.append('name', searchQuery);
    }

    try {
      const response = await axios.get<CharacterResponse>(url.href);
      data.value = response.data;
      isLoading.value = false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage.value = "No item found with that name!";
        } else {
          errorMessage.value = error.message || "An unexpected error occurred";
        }
      }
      isLoading.value = false;
      data.value = null;
    }
  };

  return { data, errorMessage, isLoading, fetchApiData };
}
