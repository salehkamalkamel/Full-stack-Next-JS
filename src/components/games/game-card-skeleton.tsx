import { Skeleton } from "@/components/ui/skeleton";

/**
 * A skeleton loader for a game card
 */
export function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      {/* Image placeholder */}
      <Skeleton className="aspect-[16/9] w-full" />

      <div className="p-4">
        {/* Badge and rating */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Description */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}
