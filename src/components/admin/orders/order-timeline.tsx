import {
  OrderWithDetailsType,
  OrderWithUserType,
} from "@/actions/order-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Package, RefreshCw, Truck, XCircle } from "lucide-react";

interface OrderTimelineProps {
  order: OrderWithDetailsType | OrderWithUserType;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  // In a real app, this would come from the order history
  const events = [
    {
      id: 1,
      status: "PENDING",
      title: "Order Placed",
      description: "Order has been placed successfully",
      date: new Date(order.createdAt).toLocaleString(),
      icon: Clock,
      completed: true,
    },
    {
      id: 2,
      status: "PROCESSING",
      title: "Processing",
      description: "Order is being processed",
      date: new Date(
        new Date(order.createdAt).getTime() + 1000 * 60 * 60 * 2
      ).toLocaleString(),
      icon: RefreshCw,
      completed: ["processing", "shipped", "delivered"].includes(order.status),
    },
    {
      id: 3,
      status: "SHIPPED",
      title: "Shipped",
      description: "Order has been shipped",
      date: new Date(
        new Date(order.createdAt).getTime() + 1000 * 60 * 60 * 24
      ).toLocaleString(),
      icon: Truck,
      completed: ["shipped", "delivered"].includes(order.status),
    },
    {
      id: 4,
      status: "DELIVERED",
      title: "Delivered",
      description: "Order has been delivered",
      date: new Date(
        new Date(order.createdAt).getTime() + 1000 * 60 * 60 * 24 * 3
      ).toLocaleString(),
      icon: Package,
      completed: order.status === "DELIVERED",
    },
  ];

  // Add cancelled or refunded event if applicable
  if (order.status === "CANCELLED") {
    events.push({
      id: 5,
      status: "CANCELLED",
      title: "Cancelled",
      description: "Order has been cancelled",
      date: new Date().toLocaleString(),
      icon: XCircle,
      completed: true,
    });
  } else if (order.status === "REFUNDED") {
    events.push({
      id: 5,
      status: "REFUNDED",
      title: "Refunded",
      description: "Order has been refunded",
      date: new Date().toLocaleString(),
      icon: RefreshCw,
      completed: true,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
        <CardDescription>Track the progress of this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border",
                    event.completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/20 bg-muted-foreground/10 text-muted-foreground"
                  )}
                >
                  <event.icon className="h-4 w-4" />
                </div>
                {index < events.length - 1 && (
                  <div
                    className={cn(
                      "my-1 w-0.5 flex-1",
                      events[index + 1].completed
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </div>
              <div className="flex flex-col pb-6">
                <span className="font-medium">{event.title}</span>
                <span className="text-sm text-muted-foreground">
                  {event.description}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {event.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
