import CartSummary, {
  CartSummarySkeleton,
} from "@/components/checkout/cart-summary";

import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CartSummarySkeleton />}>
      <CartSummary />
    </Suspense>
  );
}
