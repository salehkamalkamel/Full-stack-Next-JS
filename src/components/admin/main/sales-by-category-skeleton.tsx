import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

export function SalesByCategorySkeleton({
  spanNumber = 1,
}: {
  spanNumber?: number;
}) {
  return (
    <Card className={`col-span-${spanNumber} h-full`}>
      <CardHeader>
        {/* Skeleton for CardTitle */}
        <Skeleton className="h-6 w-3/4 rounded" />
        {/* Skeleton for CardDescription */}
        <Skeleton className="h-4 w-full rounded mt-1" />
      </CardHeader>
      <CardContent>
        {/* Skeleton for Chart Area */}
        <div className="h-[240px] flex items-center justify-center mb-4">
          <div className="relative h-40 w-40">
            {/* Skeleton for the donut chart itself */}
            <Skeleton className="h-full w-full rounded-full" />
            {/* You could optionally add skeleton text in the middle, but often just the circle is enough */}
          </div>
        </div>

        {/* Skeleton for Legend Area */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {" "}
          {/* Increased gap-y slightly for visual balance */}
          {/* Render 4 skeleton legend items as placeholders */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              {" "}
              {/* Use space-x for spacing */}
              {/* Skeleton for color indicator */}
              <Skeleton className="h-3 w-3 rounded-full" />
              {/* Skeleton for legend text */}
              <Skeleton className="h-4 w-5/6 rounded" /> {/* Adjusted width */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Export as default if you prefer
// export default SalesByCategorySkeleton;
