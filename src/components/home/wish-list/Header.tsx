"use client";
import { clearWishlist } from "@/actions/wishlist-actions";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
export default function Header({ hasItems }: { hasItems: boolean }) {
  const [isPending, startTransition] = useTransition();

  async function handleClear() {
    startTransition(async () => {
      await clearWishlist();
    });
  }
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold md:text-3xl">My Wishlist</h1>
      {hasItems && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Clear Wishlist
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear wishlist?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all games from your wishlist. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClear}>
                {isPending ? "Deleting...." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
