import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RecentOrders() {
  const resentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: true,
      orderItems: true,
    },
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest customer purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resentOrders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex flex-col">
                <div className="font-medium">{order.id}</div>
                <div className="text-sm text-muted-foreground">
                  {order.user.name}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">
                  ${order.totalPrice.toFixed(2)}
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    order.status === "COMPLETED"
                      ? "bg-green-50 text-green-700"
                      : order.status === "PENDING"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">View All Orders</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
