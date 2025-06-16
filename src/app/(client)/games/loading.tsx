import GamesPageSkeleton from "@/components/games/games-page-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <GamesPageSkeleton />
    </div>
  );
}
