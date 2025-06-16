import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    PENDING: {
      label: "Pending",
      variant: "outline" as const,
    },
    PROCESSING: {
      label: "Processing",
      variant: "default" as const,
    },
    REFUNDED: {
      label: "Refunded",
      variant: "destructive" as const,
    },
    SHIPPED: {
      label: "Shipped",
      variant: "default" as const,
    },
    DELIVERED: {
      label: "Delivered",
      variant: "default" as const,
    },
    COMPLETED: {
      label: "Delivered",
      variant: "default" as const,
    },
    CANCELLED: {
      label: "Cancelled",
      variant: "destructive" as const,
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
