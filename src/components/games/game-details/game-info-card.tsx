import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailes } from "@/lib/types/product-type";
import { Check } from "lucide-react";

export default function GameInfoCard({ game }: { game: ProductDetailes }) {
  return (
    <Card className="rounded-lg border overflow-hidden">
      <div className="bg-muted p-4">
        <h3 className="font-semibold">Game Information</h3>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Developer</div>
            <div>{game.developer}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Publisher</div>
            <div>{game.publisher}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Release Date</div>
            <div>
              {new Date(
                game.releaseDate || game.createdAt
              ).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Genres</div>
            <div className="flex flex-col items-start">
              {game.tags.map((tag) => (
                <p key={tag.id}>{tag.name}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t my-2"></div>
        {game.platforms.length > 0 && (
          <div>
            <div className="text-sm text-muted-foreground mb-2">Platforms</div>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <Badge key={platform.id} variant="outline">
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {game.features.length > 0 && (
          <>
            <div className="border-t my-2"></div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Features</div>
              <ul className="space-y-1 text-sm">
                {game.features.slice(0, 3).map((feature, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature.description}</span>
                  </li>
                ))}
                {game.features.length > 3 && (
                  <li className="text-primary text-sm mt-1 cursor-pointer hover:underline">
                    + {game.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
