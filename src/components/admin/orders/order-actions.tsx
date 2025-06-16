"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CheckCircle,
  MoreHorizontal,
  Package,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { OrderStatus, Prisma } from "@prisma/client";
import { updateOrderStatus as setOrderStatus } from "@/actions/order-actions";

interface OrderActionsProps {
  order: Prisma.OrderGetPayload<{
    include: {
      user: {
        select: {
          name: true;
        };
      };
    };
  }>;
  compact?: boolean;
}

export function OrderActions({ order, compact = false }: OrderActionsProps) {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);

  const updateOrderStatus = async (status: OrderStatus) => {
    // In a real app, this would call an API to update the order status
    await setOrderStatus(order.id, status)
      .then(() => {
        toast("Order status updated", {
          description: `Order #${order.id} has been marked as ${status}.`,
        });
      })
      .catch((error) => {
        toast.error("Failed to update order status", {
          description: error.message,
        });
      });
    // Refresh the page to show the updated status
    router.refresh();
  };

  const cancelOrder = async () => {
    await updateOrderStatus("CANCELLED");
    setShowCancelDialog(false);
  };

  const refundOrder = async () => {
    await updateOrderStatus("REFUNDED");
    setShowRefundDialog(false);
  };

  // Status update options based on current status
  const getStatusOptions = () => {
    switch (order.status) {
      case "PENDING":
        return [
          {
            label: "Mark as Processing",
            icon: RefreshCw,
            action: () => updateOrderStatus("PROCESSING"),
          },
        ];
      case "PROCESSING":
        return [
          {
            label: "Mark as Shipped",
            icon: Truck,
            action: () => updateOrderStatus("SHIPPED"),
          },
        ];
      case "SHIPPED":
        return [
          {
            label: "Mark as Delivered",
            icon: CheckCircle,
            action: () => updateOrderStatus("DELIVERED"),
          },
        ];
      default:
        return [];
    }
  };

  const statusOptions = getStatusOptions();

  // Determine if cancel/refund options should be shown
  const canCancel = ["PENDING", "PROCESSING"].includes(order.status);
  const canRefund = ["DELIVERED", "SHIPPED"].includes(order.status);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={compact ? "icon" : "default"}>
            {!compact && "Actions"}
            <MoreHorizontal className={compact ? "h-4 w-4" : "ml-2 h-4 w-4"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Order Actions</DropdownMenuLabel>

          {statusOptions.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              {statusOptions.map((option, index) => (
                <DropdownMenuItem key={index} onClick={option.action}>
                  <option.icon className="mr-2 h-4 w-4" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push(`/admin/orders/${order.id}`)}
          >
            <Package className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          {canCancel && (
            <DropdownMenuItem
              onClick={() => setShowCancelDialog(true)}
              className="text-destructive focus:text-destructive"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Order
            </DropdownMenuItem>
          )}

          {canRefund && (
            <DropdownMenuItem
              onClick={() => setShowRefundDialog(true)}
              className="text-warning focus:text-warning"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Process Refund
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Cancel Order Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order #{order.id}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={cancelOrder}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Refund Order Dialog */}
      <AlertDialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Process Refund</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to process a refund for order #{order.id}?
              This will refund {order.totalPrice.toFixed(2)} to the customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={refundOrder}
              className="bg-warning text-warning-foreground hover:bg-warning/90"
            >
              Yes, Process Refund
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
