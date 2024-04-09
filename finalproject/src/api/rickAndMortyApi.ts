import axios from 'axios';
import  type { CharacterResponse } from '../models/Character';

const baseURL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (page: number = 1): Promise<CharacterResponse> => {
  try {
    const response = await axios.get(`${baseURL}/?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch characters');
  }
};

export async function fetchCharacterById(id : number) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return response.json();
  } catch (error) {
    console.error('Failed to fetch character details:', error);
  }
}