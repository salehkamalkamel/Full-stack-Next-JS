"use client";
import {
  addToCart,
  IsAddedToCartType,
  removeFromCart,
} from "@/actions/cart-action";
import {
  addToWishlist,
  IsAddedToWishlistType,
  removeFromWishlist,
} from "@/actions/wishlist-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDetailes } from "@/lib/types/product-type";
import { Heart, ShoppingCart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function PurchaseOptions({
  game,
  addedToWishlist,
  addedToCart,
}: {
  game: ProductDetailes;
  addedToWishlist: IsAddedToWishlistType | null;
  addedToCart: IsAddedToCartType | null;
}) {
  const [isAddingWishlist, startTransitionWishlist] = useTransition();
  const [isAddingCart, startTransitionWishCart] = useTransition();

  async function handleAddToCart() {
    try {
      startTransitionWishCart(async () => {
        if (!addedToCart) {
          await addToCart(game.id)
            .then(() => {
              toast.success(`${game.name} added to cart`, {
                description: "You can view your cart at any time.",
                action: {
                  label: "View Cart",
                  onClick: () => {
                    window.location.href = "/checkout";
                  },
                },
              });
            })
            .catch((err) => {
              console.error(err);
              toast.error("Unable to add to cart");
            });
        } else {
          await removeFromCart(addedToCart.id)
            .then(() => {
              toast.success(`${game.name} removed from cart`, {
                description: "You can view your cart at any time.",
                action: {
                  label: "View Cart",
                  onClick: () => {
                    window.location.href = "/cart";
                  },
                },
              });
            })
            .catch((err) => {
              console.error(err);
              toast.error("Unable to remove from cart");
            });
        }
      });
    } catch (err) {
      console.error(err);
      throw new Error("Handler Function error: unable to add to cart");
    }
  }

  async function handleAddToWishlist() {
    try {
      startTransitionWishlist(async () => {
        if (addedToWishlist?.state && addedToWishlist.data) {
          await removeFromWishlist(addedToWishlist.data.id);
        } else {
          await addToWishlist(game.id);
        }
      });
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }
  return (
    <Card className="rounded-lg border overflow-hidden">
      <div className="bg-muted p-4">
        <h3 className="font-semibold">Purchase Options</h3>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Standard Edition</h4>
              <p className="text-sm text-muted-foreground">Base game</p>
            </div>
            <div className="font-bold">${game.price.toFixed(2)}</div>
          </div>
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isAddingCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {addedToCart
              ? isAddingCart
                ? "Removing From Cart..."
                : "Remove From Cart"
              : isAddingCart
              ? "Adding to Cart..."
              : "Add to Cart"}
            {/* {isAddingCart ? "Adding to Cart..." : "Add to Cart"} */}
          </Button>
          <Button
            variant="outline"
            className={`w-full ${
              addedToWishlist?.state ? "bg-primary/10" : ""
            }`}
            onClick={handleAddToWishlist}
            disabled={isAddingWishlist}
          >
            <Heart
              className={`mr-2 h-4 w-4 ${
                addedToWishlist?.state ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {addedToWishlist?.state
              ? isAddingWishlist
                ? "Removing..."
                : "Remove From Wish List"
              : isAddingWishlist
              ? "Adding..."
              : "Add To Wish List"}
          </Button>
        </div>
        <div className="rounded-lg border p-4 space-y-3 bg-muted/50">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Deluxe Edition</h4>
                <Badge>Best Value</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Base game + Season Pass
              </p>
            </div>
            <div className="font-bold">${(game.price * 1.5).toFixed(2)}</div>
          </div>
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>Includes:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Full Game</li>
              <li>Season Pass (3 DLCs)</li>
              <li>Exclusive Digital Artbook</li>
              <li>Digital Soundtrack</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
