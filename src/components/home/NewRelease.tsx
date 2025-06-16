import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { prisma } from "@/lib/prisma";

export default async function NewRelease() {
  // 1. Get date from 3 days ago
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  // 2. Fetch games created within the last 3 days
  const newReleases = await prisma.product.findMany({
    include: {
      images: true,
    },
    where: {
      createdAt: {
        gte: threeDaysAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8, // Limit the number to avoid overloading the UI
  });

  return (
    <section className="py-12 md:py-16 container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          New Releases
        </h2>
        <Link
          href="/games"
          className="text-primary flex items-center hover:underline"
        >
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {newReleases.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No new games released in the past 3 days.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((game) => (
            <Card key={game.id} className="overflow-hidden">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={game.images[0].url || "/placeholder.svg"}
                  alt={game.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{game.category}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm">5</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {game.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="font-semibold">${game.price}</span>
                <Button size="sm" asChild>
                  <Link href={`/games/${game.id}`}>View Game</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
