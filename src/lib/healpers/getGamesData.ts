import { prisma } from "../prisma";
import { GameWithDetails } from "../types/games-type";

export async function getGamesData(): Promise<GameWithDetails[]> {
  try {
    const games = await prisma.product.findMany({
      include: {
        images: true,
        platforms: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // --- Data Transformation (Important!) ---
    // Ensure the fetched data matches the structure expected by GameWithDetails
    // This might involve mapping or adjusting fields. Example:
    return games.map((game) => ({
      id: game.id,
      title: game.name, // Map 'name' to 'title' if needed
      description: game.description ?? "", // Provide default empty string if null
      image:
        game.images && game.images.length > 0
          ? game.images[0].url
          : "/placeholder.svg", // Safely access image
      category: game.category ?? "Unknown", // Handle potential null category
      platform: game.platforms.map((platform) => platform.name) || [], // Map platforms to extract names
      price: game.price,
      rating: 5, // !! Replace with actual rating from game data (e.g., game.rating) !!
      releaseDate: game.createdAt.toISOString(), // Example: use createdAt if no releaseDate field
    }));
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return []; // Return empty array on error
  }
}
