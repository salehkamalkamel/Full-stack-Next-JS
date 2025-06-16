import { Suspense } from "react";
import { GamesServerSide } from "@/components/games/GamesServerSide";
import GamesPageSkeleton from "@/components/games/games-page-skeleton";

export default function GamesPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Pass initial data and static filter options to the client component */}
      {/* Suspense can be used here if data fetching is slow, wrapping GamesClientView */}
      <Suspense fallback={<GamesPageSkeleton />}>
        <GamesServerSide />
      </Suspense>
    </div>
  );
}
