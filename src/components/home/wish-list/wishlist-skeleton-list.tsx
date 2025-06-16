import WishListItemSkeleton from "./wishlist-skeleton-item";

export default function WishlistSkeletonList() {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <WishListItemSkeleton key={index} />
      ))}
    </div>
  );
}
