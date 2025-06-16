import InventoryStatus from "@/components/admin/main/inventory-status";
import MainHeader from "@/components/admin/main/main-header";
import MainStateOverview from "@/components/admin/main/main-state-overview";
import RecentOrders from "@/components/admin/main/recent-orders";
import SalesByCategory from "@/components/admin/main/sales-by-category";
import { SalesByCategorySkeleton } from "@/components/admin/main/sales-by-category-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ from: string }>;
}) {
  const { from } = (await searchParams) || { from: "2023-01-01" };
  return (
    <div className="flex min-h-screen flex-col">
      <div className="">
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <>
              <MainHeader />
              <MainStateOverview from={from} />
              <div className="grid gap-4 md:grid-cols-2 mt-8 ">
                <Suspense fallback={<SalesByCategorySkeleton />}>
                  <SalesByCategory from={from} />
                </Suspense>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>
                      Active users and engagement metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">
                            Daily Active Users
                          </div>
                          <div className="text-sm text-muted-foreground">
                            1,245
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[85%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">
                            Average Session Time
                          </div>
                          <div className="text-sm text-muted-foreground">
                            24 min
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[65%] rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">
                            Cart Abandonment Rate
                          </div>
                          <div className="text-sm text-muted-foreground">
                            22%
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[22%] rounded-full bg-amber-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">
                            Conversion Rate
                          </div>
                          <div className="text-sm text-muted-foreground">
                            3.2%
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[3.2%] rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 border-t pt-4">
                      <div className="text-sm font-medium mb-2">
                        Top Devices
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-md border p-2">
                          <div className="text-xs text-muted-foreground">
                            Desktop
                          </div>
                          <div className="text-sm font-medium">64%</div>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="text-xs text-muted-foreground">
                            Mobile
                          </div>
                          <div className="text-sm font-medium">28%</div>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="text-xs text-muted-foreground">
                            Tablet
                          </div>
                          <div className="text-sm font-medium">8%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-7 mt-8">
                <Suspense fallback={<SalesByCategorySkeleton spanNumber={4} />}>
                  <RecentOrders />
                </Suspense>

                <Suspense fallback={<SalesByCategorySkeleton spanNumber={3} />}>
                  <InventoryStatus />
                </Suspense>
              </div>
            </>
          </main>
        </div>
      </div>
    </div>
  );
}
