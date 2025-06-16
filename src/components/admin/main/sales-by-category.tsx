import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSalesByCategory } from "@/lib/admin-data";

const CATEGORY_COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // green-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#6366f1", // indigo-500
];

export default async function SalesByCategory({ from }: { from: string }) {
  const { categoryData, totalSales } = await getSalesByCategory(from);
  console.log(categoryData);

  // Donut chart calculation constants
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // approx 251.327

  let cumulativeOffset = 0; // To track the starting point for each segment

  // Handle case where there's no sales data
  if (totalSales === 0 || categoryData.length === 0) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>
            Distribution of sales across game categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[328px] flex items-center justify-center text-muted-foreground">
            No sales data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the top category for display in the center
  const topCategory = categoryData[0];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>
          Distribution of sales across game categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] flex items-center justify-center mb-4">
          {" "}
          {/* Added mb-4 */}
          <div className="relative h-40 w-40">
            {/* Center Text - Show Top Category */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {`${topCategory.percentage.toFixed(0)}%`}
                </div>
                <div
                  className="text-xs text-muted-foreground truncate px-2"
                  title={topCategory.name}
                >
                  {topCategory.name}
                </div>
              </div>
            </div>
            {/* Donut Chart SVG */}
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              {" "}
              {/* Use Tailwind's -rotate-90 */}
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="hsl(var(--border))" // Use theme border color
                strokeWidth="10"
              />
              {/* Data Segments */}
              {categoryData.map((category, index) => {
                const segmentLength =
                  (category.percentage / 100) * circumference;
                const strokeDashoffsetValue = cumulativeOffset;
                // Update cumulative offset for the *next* segment
                cumulativeOffset += segmentLength;
                // Get color for this segment
                const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                return (
                  <circle
                    key={category.name}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    // The offset determines the *start* of the visible segment
                    strokeDashoffset={strokeDashoffsetValue}
                    // strokeLinecap="round" // Optional: Makes segment ends rounded
                  />
                );
              })}
            </svg>
          </div>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {categoryData.map((category, index) => {
            const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
            return (
              <div key={category.name} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full mr-2 shrink-0" // Added shrink-0
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className="text-sm truncate"
                  title={`${category.name} (${category.percentage.toFixed(
                    1
                  )}%)`}
                >
                  {category.name} ({category.percentage.toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
