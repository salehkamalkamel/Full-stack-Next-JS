import { listOrdersForUser } from "@/actions/order-actions";
import OrderItem from "@/components/account/order-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import Link from "next/link";

export default async function OrdersPage() {
  const ordersData = await listOrdersForUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View all your past orders and their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ordersData.length > 0 ? (
          <div className="space-y-6">
            {ordersData.map((order) => (
              <OrderItem orderItem={order} key={order.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              {" You haven't made any purchases yet."}
            </p>
            <Button asChild>
              <Link href="/games">Browse Games</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
