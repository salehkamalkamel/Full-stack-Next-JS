import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDateRange } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { BarChart3, Package, Users } from "lucide-react";
import { Suspense } from "react";

export default function MainStateOverview({ from }: { from: string }) {
  const fromDate = getDateRange(from);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardSkeleton />}>
        <SalesCard fromDate={fromDate} />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <OrdersCard fromDate={fromDate} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <CustomersCard fromDate={fromDate} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ProductsCard fromDate={fromDate} />
      </Suspense>
    </div>
  );
}

async function SalesCard({ fromDate }: { fromDate: Date }) {
  const salesData = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: fromDate, // Filter orders created from the specified date
      },
      status: {
        in: ["COMPLETED", "DELIVERED"],
      }, // Only consider completed orders
    },
  });
  const totalSales =
    salesData.reduce((acc, cur) => acc + cur.totalPrice, 0).toFixed(2) || 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalSales}</div>
        <div className="flex items-center pt-1">
          <span className="text-xs text-green-500 font-medium">
            {+totalSales > 0 ? "+12.5%" : "0%"}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            from last period
          </span>
        </div>

        <div className="mt-3 h-[60px]">
          <div className="flex h-full items-end gap-1">
            {[40, 25, 55, 32, 80, 45, 68].map((height, i) => (
              <div
                key={i}
                className="w-full bg-primary/10 rounded-sm relative overflow-hidden"
                style={{ height: `${height}%` }}
              >
                <div
                  className="absolute bottom-0 w-full bg-primary rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function OrdersCard({ fromDate }: { fromDate: Date }) {
  const ordersLength =
    (await prisma.order.count({
      where: {
        createdAt: {
          gte: fromDate, // Filter orders created from the specified date
        },
        status: {
          in: ["COMPLETED", "DELIVERED"],
        }, // Only consider completed orders
      },
    })) || 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Orders</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{ordersLength}</div>
        <div className="flex items-center pt-1">
          <span className="text-xs text-green-500 font-medium">
            {ordersLength > 0 ? "+8.2%" : "0%"}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            from last period
          </span>
        </div>
        <div className="mt-3 h-[60px]">
          <div className="flex h-full items-end gap-1">
            {[35, 60, 40, 30, 55, 65, 45].map((height, i) => (
              <div
                key={i}
                className="w-full bg-blue-500/10 rounded-sm relative overflow-hidden"
                style={{ height: `${height}%` }}
              >
                <div
                  className="absolute bottom-0 w-full bg-blue-500 rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function CustomersCard({ fromDate }: { fromDate: Date }) {
  const customersLength =
    (await prisma.user.count({
      where: {
        createdAt: {
          gte: fromDate, // Filter users created from the specified date
        },
      },
    })) || 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Customers</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{customersLength}</div>
        <div className="flex items-center pt-1">
          <span className="text-xs text-green-500 font-medium">
            {customersLength > 0 ? "+5.0%" : "0%"}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            from last period
          </span>
        </div>
        <div className="mt-3 h-[60px]">
          <div className="flex h-full items-end gap-1">
            {[25, 40, 30, 50, 35, 45, 55].map((height, i) => (
              <div
                key={i}
                className="w-full bg-green-500/10 rounded-sm relative overflow-hidden"
                style={{ height: `${height}%` }}
              >
                <div
                  className="absolute bottom-0 w-full bg-green-500 rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function ProductsCard({ fromDate }: { fromDate: Date }) {
  const productsData =
    (await prisma.product.count({ where: { createdAt: { gte: fromDate } } })) ||
    0;
  const lowStock =
    (await prisma.product.count({ where: { stock: { lt: 5 } } })) || 0;
  const inStock = productsData - lowStock;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Products</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{productsData}</div>
        <div className="flex items-center pt-1">
          <span className="text-xs text-green-500 font-medium">
            {productsData > 0 ? "+10.0%" : "0%"}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            new products
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-md border p-2">
            <div className="text-xs text-muted-foreground">In Stock</div>
            <div className="text-sm font-medium">{inStock}</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="text-xs text-muted-foreground">Low Stock</div>
            <div className="text-sm font-medium">{lowStock}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
        <div className="mt-3 h-[60px]">
          <div className="flex h-full items-end gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-full bg-gray-300 rounded-sm relative overflow-hidden"
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
