import OrderReview, {
  OrderReviewSkeleton,
} from "@/components/checkout/order-review";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

export default async function SummaryPage({
  searchParams,
}: {
  searchParams: Promise<{ addressId?: string | null }>;
}) {
  const params = await searchParams;
  const addressId = params?.addressId || null;
  const cartItems = (await prisma.cartItem.count()) || 0;

  if (cartItems === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some items to your cart to continue checkout.
        </p>
        <Button asChild>
          <Link href="/games">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (!addressId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Address Required</h2>
        <p className="text-gray-500 mb-6">
          Please provide a shipping address to continue checkout.
        </p>
        <Button asChild>
          <Link href="/checkout/shipping">Add Address</Link>
        </Button>
      </div>
    );
  }

  return (
    <Suspense fallback={<OrderReviewSkeleton />}>
      <OrderReview addressId={addressId} />
    </Suspense>
  );
}
