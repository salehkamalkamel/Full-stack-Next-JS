import { Skeleton } from "@/components/ui/skeleton";

export default function WishListItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 rounded-lg border p-4">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/2] sm:w-48 overflow-hidden rounded-md">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      {/* Text + Buttons Skeleton */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="mb-2 h-5 w-24 rounded-full" />
              <Skeleton className="h-6 w-40 mb-2" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="mt-2 h-16 w-full" />
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    </div>
  );
}
