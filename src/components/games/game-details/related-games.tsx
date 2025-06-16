import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

interface RelatedGamesProps {
  category: string;
}

export default async function RelatedGames({ category }: RelatedGamesProps) {
  const games = await prisma.product.findMany({
    where: {
      category,
    },
    include: {
      images: true,
    },
  });

  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="flex flex-col items-center sm:flex-row gap-2 text-center sm:text-start  justify-between mb-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <Button variant="outline" asChild>
          <Link href="/games">View All Games</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="group rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={game.images[0].url || "/placeholder.svg"}
                alt={game.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{game.category}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="text-sm">5</span>
                </div>
              </div>
              <h3 className="font-semibold">{game.name}</h3>
              <div className="mt-2 font-medium">${game.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
