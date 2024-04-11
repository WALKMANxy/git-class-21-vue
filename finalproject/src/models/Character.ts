// Defines a TypeScript type for the structure of the API response related to characters.
export type CharacterResponse = {
  // The info field is optional and contains pagination details.
  info?: PaginationInfo;
  // The results field is optional and contains an array of Character objects.
  results?: Character[];
};

// Defines a TypeScript type for pagination information included in the CharacterResponse.
export type PaginationInfo = {
  // The total number of items available.
  count: number;
  // The total number of pages available.
  pages: number;
  // The URL of the next page, or null if there is no next page.
  next: string | null;
  // The URL of the previous page, or null if there is no previous page.
  prev: string | null;
};

// Defines a TypeScript type for individual characters returned in the CharacterResponse.
export type Character = {
  // Unique identifier for the character.
  id: number;
  // Name of the character.
  name: string;
  // Status of the character (e.g., Alive, Dead, unknown).
  status: string;
  // Species of the character.
  species: string;
  // Type of the character. The field is flexible and can be updated based on actual data received.
  type: string; // Update the type based on the actual data you expect
  // Gender of the character.
  gender: string;
  // Origin of the character, containing the name and URL of the character's original location.
  origin: {
    name: string;
    url: string;
  };
  // Current location of the character, containing the name and URL of the character's current location.
  location: {
    name: string;
    url: string;
  };
  // URL to the character's image.
  image: string;
  // Array of URLs pointing to episodes in which the character has appeared.
  episode: string[]; // An array of episode URLs
  // URL of the character's own API endpoint.
  url: string;
  // The ISO 8601 date string of the time at which the character was created in the database.
  created: string;
};
