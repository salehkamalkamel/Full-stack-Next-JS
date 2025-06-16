import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import WishListItem from "@/components/home/wish-list/Item";
import { getWishList } from "@/actions/wishlist-actions";

export default async function WishlistData() {
  const wishlist = await getWishList();
  return (
    <>
      {wishlist?.length > 0 ? (
        <div className="grid gap-6">
          {wishlist?.map((item) => (
            <WishListItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {
              " Add games to your wishlist to keep track of the titles you're interested in."
            }
          </p>
          <Button asChild>
            <Link href="/games">Browse Games</Link>
          </Button>
        </div>
      )}
    </>
  );
}
