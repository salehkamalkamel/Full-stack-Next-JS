// --- Define the Game Type ---
// Ensure this matches the data structure returned by getGamesData in the server component
export type GameWithDetails = {
  id: string; // Or number, depending on your schema
  title: string;
  description: string;
  image: string; // URL or path
  category: string;
  platform: string[]; // Array of platform names
  price: number;
  rating: number;
  releaseDate: string; // ISO string format recommended
};

// --- Props for the Client Component ---
export interface GamesClientViewProps {
  initialGames: GameWithDetails[];
  allCategories: string[];
  allPlatforms: string[];
}

// --- Reusable Filter Section Component ---
export interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggleItem: (item: string) => void;
  idPrefix: string;
}
