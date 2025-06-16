import { notFound } from "next/navigation";
import Link from "next/link";
import { OrderDetails } from "@/components/admin/orders/order-details";
import { OrderTimeline } from "@/components/admin/orders/order-timeline";
import { OrderActions } from "@/components/admin/orders/order-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { getOrderById } from "@/actions/order-actions";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/orders">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to orders</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Order #{order.id}
            </h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <OrderActions order={order} />
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderDetails order={order} />
        </div>
        <div>
          <OrderTimeline order={order} />
        </div>
      </div>
    </div>
  );
}
