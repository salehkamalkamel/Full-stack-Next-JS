import { Skeleton } from "../ui/skeleton";
import { GamesGridSkeleton } from "./games-grid-skeleton";

export default function GamesPageSkeleton() {
  return (
    <div className="container p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Desktop Sidebar Filters Skeleton */}
        <div className="hidden md:block w-64 sticky top-20">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>

            {/* Category Filter Skeleton */}
            <div>
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Filter Skeleton */}
            <div>
              <Skeleton className="h-6 w-24 mb-3" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter Skeleton */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-full my-4" />
            </div>
          </div>
        </div>

        {/* Games Grid Skeleton */}
        <div className="flex-1">
          {/* Sort and Results Count Skeleton */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </div>

          {/* Mobile Sort Skeleton */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-[140px]" />
          </div>

          <GamesGridSkeleton />
        </div>
      </div>
    </div>
  );
}
