"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddProductContext } from "@/contexts/AddProductContext";

export function SuccessDialog() {
  const { resetForm, showSuccessDialog, setShowSuccessDialog } =
    useAddProductContext();
  return (
    <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Added Successfully</DialogTitle>
          <DialogDescription>
            Your product has been added to the catalog and is now available for
            customers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <DialogFooter>
          <Button asChild onClick={() => setShowSuccessDialog(false)}>
            <Link href="/admin">Return to Dashboard</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowSuccessDialog(false);
              resetForm();
            }}
          >
            Add Another Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
