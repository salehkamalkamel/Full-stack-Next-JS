import { GameCardSkeleton } from "./game-card-skeleton";

interface GamesGridSkeletonProps {
  /**
   * The number of skeleton cards to display
   */
  count?: number;
}

/**
 * A grid of game card skeletons
 */
export function GamesGridSkeleton({ count = 12 }: GamesGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <GameCardSkeleton key={index} />
      ))}
    </div>
  );
}
