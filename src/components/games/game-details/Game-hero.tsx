import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, Calendar, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductDetailes } from "@/lib/types/product-type";

interface GameHeroProps {
  game: ProductDetailes;
}

export function GameHero({ game }: GameHeroProps) {
  return (
    <div className="relative bg-black px-4 ">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={game.images[0].url || "/placeholder.svg"}
          alt={game.name}
          fill
          className="object-cover opacity-30 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="container mx-auto relative z-10 py-12 md:py-16">
        <nav className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/games" className="hover:text-white">
            Games
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-white">{game.name}</span>
        </nav>

        <div className="grid grid-cols-1 grid-flow-row md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {game.tags.map((genre: { id: string; name: string }) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {game.name}
            </h1>
            <div className="flex flex-col items-start  sm:flex-row sm:items-center gap-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 5
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-white">5</span>
                <span className="ml-1 text-gray-400">(28 reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-6 bg-gray-600" />
              <div className="text-white">
                <span className="text-gray-400 mr-1">By</span>
                {game.developer}
              </div>
            </div>
            <p className="text-gray-300 max-w-xl">
              {game.description.slice(0, 200)}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>
                  Released:{" "}
                  {new Date(
                    game.releaseDate || game.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <User className="h-5 w-5 text-gray-400" />
                <span>Publisher: {game.publisher}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <PriceCard game={game} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceCard({ game }: { game: ProductDetailes }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        {game.onSale ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                ${game.salePrice?.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${game.price.toFixed(2)}
              </span>
              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                {Math.round(
                  ((game.price - (game.salePrice ?? 0)) / game.price) * 100
                )}
                % OFF
              </Badge>
            </div>
            <p className="text-sm text-gray-400">Sale ends in 3 days</p>
          </div>
        ) : (
          <span className="text-3xl font-bold">${game.price.toFixed(2)}</span>
        )}
      </div>
      <div className="mt-6 space-y-3">
        <div className="text-sm text-gray-300">Available on</div>
        <div className="flex flex-wrap gap-2">
          {game.platforms.map((platform) => (
            <Badge
              key={platform.id}
              variant="outline"
              className="border-gray-600 text-white"
            >
              {platform.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
