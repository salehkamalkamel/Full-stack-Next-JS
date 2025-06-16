import Header from "@/components/home/wish-list/Header";
import { getWishList } from "@/actions/wishlist-actions";
import { Suspense } from "react";
import WishlistSkeletonList from "@/components/home/wish-list/wishlist-skeleton-list";
import WishlistData from "@/components/home/wish-list/wishlist-data";
// Mock wishlist data

export default async function WishlistPage() {
  const wishlist = await getWishList();

  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <div className="flex flex-col gap-8">
        <Header hasItems={Boolean(wishlist.length > 0)} />
        <Suspense fallback={<WishlistSkeletonList />}>
          <WishlistData />
        </Suspense>
      </div>
    </div>
  );
}
