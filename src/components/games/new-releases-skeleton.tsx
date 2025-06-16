import { Skeleton } from "@/components/ui/skeleton";

/**
 * A skeleton loader for the new releases section on the homepage
 */
export function NewReleasesSkeleton() {
  return (
    <section className="py-12 md:py-16 container">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="overflow-hidden">
            <Skeleton className="aspect-[3/2] w-full rounded-md mb-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
