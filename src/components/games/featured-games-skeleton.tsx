import { Skeleton } from "@/components/ui/skeleton";

/**
 * A skeleton loader for the featured games section on the homepage
 */
export function FeaturedGamesSkeleton() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden border-0 bg-background rounded-lg"
            >
              <Skeleton className="aspect-[16/9] w-full" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
                <div className="flex items-center justify-between mt-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
