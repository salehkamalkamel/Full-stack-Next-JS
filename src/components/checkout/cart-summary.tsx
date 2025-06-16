import { Button } from "@/components/ui/button";
import Link from "next/link";
import CartItem from "./cart-item";
import { prisma } from "@/lib/prisma";

export default async function CartSummary() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const cartData = await prisma.cartItem.findMany({
    include: {
      product: {
        include: {
          images: true,
        },
      },
    },
  });

  if (cartData.length === 0) {
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Shopping Cart</h2>

      <div className="space-y-6">
        {cartData.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button asChild>
          <Link href="/checkout/shipping">Proceed to Shipping</Link>
        </Button>
      </div>
    </div>
  );
}

export function CartSummarySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="space-y-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
