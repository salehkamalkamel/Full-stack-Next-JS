import { getGamesData } from "@/lib/healpers/getGamesData";
import GamesClientView from "./GamesClientView";

const categories = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Racing",
  "Simulation",
  "Sports",
  "Survival",
];
const platforms = ["PC", "PlayStation", "Xbox", "Switch"];

export async function GamesServerSide() {
  const initialGames = await getGamesData();
  return (
    <GamesClientView
      initialGames={initialGames}
      allCategories={categories}
      allPlatforms={platforms}
    />
  );
}
