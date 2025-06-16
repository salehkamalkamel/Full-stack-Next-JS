"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import { CheckCircle, Truck, XCircle } from "lucide-react";

interface BulkActionsProps {
  selectedOrders?: string[];
}

export function BulkActions({ selectedOrders = [] }: BulkActionsProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showShipDialog, setShowShipDialog] = useState(false);
  const [showDeliverDialog, setShowDeliverDialog] = useState(false);

  const hasSelectedOrders = selectedOrders.length > 0;

  const handleBulkCancel = () => {
    // In a real app, this would call an API to cancel the selected orders
    toast("Orders cancelled", {
      description: `${selectedOrders.length} orders have been cancelled.`,
    });
    setShowCancelDialog(false);
  };

  const handleBulkShip = () => {
    // In a real app, this would call an API to mark the selected orders as shipped

    toast("Orders shipped", {
      description: `${selectedOrders.length} orders have been marked as shipped.`,
    });

    setShowShipDialog(false);
  };

  const handleBulkDeliver = () => {
    // In a real app, this would call an API to mark the selected orders as delivered

    toast("Orders delivered", {
      description: `${selectedOrders.length} orders have been marked as delivered.`,
    });

    setShowDeliverDialog(false);
  };

  if (!hasSelectedOrders) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2 rounded-md border bg-muted/40 p-3">
        <span className="text-sm font-medium">
          {selectedOrders.length}{" "}
          {selectedOrders.length === 1 ? "order" : "orders"} selected
        </span>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowShipDialog(true)}
          >
            <Truck className="mr-2 h-4 w-4" />
            Mark as Shipped
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDeliverDialog(true)}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Delivered
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => setShowCancelDialog(true)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Orders
          </Button>
        </div>
      </div>

      {/* Bulk Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Multiple Orders</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel {selectedOrders.length}{" "}
              {selectedOrders.length === 1 ? "order" : "orders"}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Orders
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Ship Dialog */}
      <AlertDialog open={showShipDialog} onOpenChange={setShowShipDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Orders as Shipped</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark {selectedOrders.length}{" "}
              {selectedOrders.length === 1 ? "order" : "orders"} as shipped?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkShip}>
              Yes, Mark as Shipped
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Deliver Dialog */}
      <AlertDialog open={showDeliverDialog} onOpenChange={setShowDeliverDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Orders as Delivered</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark {selectedOrders.length}{" "}
              {selectedOrders.length === 1 ? "order" : "orders"} as delivered?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDeliver}>
              Yes, Mark as Delivered
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
