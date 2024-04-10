import axios from "axios";
import type { CharacterResponse } from "../models/Character";

const baseURL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (
  page: number = 1,
  searchQuery?: string
): Promise<CharacterResponse | "NOT_FOUND"> => {
  const url = new URL(baseURL);
  url.searchParams.append("page", String(page));
  if (searchQuery) {
    url.searchParams.append("name", searchQuery);
  }

  try {
    const response = await axios.get<CharacterResponse>(url.href);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      if (error.response?.status === 404) {
        // Return a 'NOT_FOUND' indicator or throw a specific error for handling in UI
        return "NOT_FOUND";
      }
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Failed to fetch characters");
    }
  }
};

export async function fetchCharacterById(id: number) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch character details:", error);
    throw new Error("Failed to fetch character details");
  }
}
