import { listOrdersForUser } from "@/actions/order-actions";
import { CreditCard } from "@/components/checkout/payment-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

import { Heart, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AccountPage() {
  const ordersData = await listOrdersForUser();
  const wishListLength = await prisma.wishListItem.count();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>
            View your account information and recent activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="text-xl font-medium">{ordersData.length}</div>
                  <div className="text-sm text-muted-foreground">Orders</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Heart className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="text-xl font-medium">{wishListLength}</div>
                  <div className="text-sm text-muted-foreground">
                    Wishlist Items
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="text-xl font-medium">1</div>
                  <div className="text-sm text-muted-foreground">
                    Payment Methods
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your most recent purchases.</CardDescription>
        </CardHeader>
        <CardContent>
          {ordersData.slice(0, 2).map((order) => (
            <div key={order.id} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-12 w-12 overflow-hidden rounded-md"
                  >
                    <Image
                      src={item.product.images[0].url || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/orders">View All Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
