import { GameHero } from "@/components/games/game-details/Game-hero";
import GameInfoSidebar from "@/components/games/game-details/game-info-sidebar";
import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const MediaGallery = dynamic(
  () => import("@/components/games/game-details/media-gallery")
);
const GameDetailsTabs = dynamic(
  () => import("@/components/games/game-details/game-details-tab")
);
const RelatedGames = dynamic(
  () => import("@/components/games/game-details/related-games")
);
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      platforms: true,
      tags: true,
      features: true,
      systemRequirements: true,
    },
  });

  if (!game) {
    notFound();
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <GameHero game={game} />

      {/* Main Content */}
      <div className="container mx-auto px-4  py-12">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            {/* Media Gallery */}
            <MediaGallery images={game.images} />

            {/* Game Details Tabs */}
            <GameDetailsTabs game={game} />
          </div>

          {/* Sidebar */}
          <GameInfoSidebar game={game} />
        </div>

        {/* Related Games */}
        <RelatedGames category={game.category} />
      </div>
    </div>
  );
}
