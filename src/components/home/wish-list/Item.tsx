"use client";

import { addToCart } from "@/actions/cart-action";
import { removeFromWishlist } from "@/actions/wishlist-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

type WishListItemType = Prisma.WishListItemGetPayload<{
  include: {
    product: {
      include: {
        images: true;
      };
    };
  };
}>;
export default function WishListItem({ item }: { item: WishListItemType }) {
  const [isPending, startTransition] = useTransition();
  const [isAddingCart, startTransitionWishCart] = useTransition();

  async function handleAddToCart() {
    try {
      startTransitionWishCart(async () => {
        await addToCart(item.product.id);
      });
    } catch (err) {
      console.error(err);
      throw new Error("Handler Function error: unable to add to cart");
    }
  }
  async function handleRemove() {
    startTransition(async () => {
      await removeFromWishlist(item.id);
    });
  }
  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row gap-6 rounded-lg border p-4"
    >
      <div className="relative aspect-[3/2] sm:w-48 overflow-hidden rounded-md">
        <Image
          src={item.product.images[0].url || "/placeholder.svg"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {item.product.category}
              </Badge>
              <h2 className="text-xl font-semibold">
                <Link href={`/games/${item.id}`} className="hover:underline">
                  {item.product.name}
                </Link>
              </h2>
            </div>
            <div className="text-xl font-bold">
              ${item.product.price.toFixed(2)}
            </div>
          </div>
          <p className="hidden sm:block mt-2 text-muted-foreground">
            {item.product.description.slice(0, 300) + "..."}
          </p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/games/${item.productId}`}>View Details</Link>
          </Button>
          <Button size="sm" onClick={handleAddToCart} disabled={isAddingCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAddingCart ? "Adding to cart..." : "Add to Cart"}
          </Button>
          <AlertDialog
          // open={itemToRemove === item.id}
          // onOpenChange={(open) => !open && setItemToRemove(null)}
          >
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                disabled={isPending}
                className="text-destructive hover:text-destructive"
                // onClick={() => setItemToRemove(item.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isPending ? "Removing..." : "Remove"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove from wishlist?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove {item.product.name} from your wishlist.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRemove}
                  // onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
