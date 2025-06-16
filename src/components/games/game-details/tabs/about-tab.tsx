"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDetailes } from "@/lib/types/product-type";

export default function AboutTab({ game }: { game: ProductDetailes }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="prose max-w-none dark:prose-invert">
      <p className="text-muted-foreground whitespace-pre-line">
        {showFullDescription
          ? game.description
          : `${game.description.substring(0, 500)}...`}
      </p>
      {game.description.length > 500 && (
        <Button
          variant="link"
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="px-0"
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </Button>
      )}
    </div>
  );
}
