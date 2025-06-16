"use client";
import { OrderItemType } from "@/lib/types/order-types";
import OrderStatusView from "./order-status-view";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { cancelOrder, deleteOrder } from "@/actions/order-actions";
import { useTransition } from "react";

export default function OrderItem({ orderItem }: { orderItem: OrderItemType }) {
  const [isPendingCancel, startTransitionCancel] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  async function handleCancelOrder() {
    startTransitionCancel(async () => {
      await cancelOrder(orderItem.id);
    });
  }

  async function handleDeleteOrder() {
    startTransitionDelete(async () => {
      await deleteOrder(orderItem.id);
    });
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div>
          <div className="font-medium">{orderItem.id}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(orderItem.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-2 sm:mt-0 sm:text-right">
          <div className="font-medium">${orderItem.totalPrice.toFixed(2)}</div>
          <OrderStatusView state={orderItem.status} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        {orderItem.orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
              <Image
                src={item.product.images[0].url || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.product.name}</div>
              <div className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/games/${item.id}`}>
                View
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              {orderItem.status === "CANCELLED" ||
              orderItem.status === "COMPLETED"
                ? "Delete Order"
                : "Cancel Order"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {orderItem.status === "CANCELLED" ||
                orderItem.status === "COMPLETED"
                  ? "Delete Order?"
                  : "Cancel Order?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {orderItem.status === "CANCELLED"
                  ? "This will delete your order. This action cannot be undone."
                  : "This will cancel your order. This action cannot be undone."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (orderItem.status === "CANCELLED") {
                    handleDeleteOrder();
                  } else {
                    handleCancelOrder();
                  }
                }}
              >
                {isPendingCancel || isPendingDelete
                  ? isPendingDelete
                    ? "Deleting..."
                    : "Canceling..."
                  : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
