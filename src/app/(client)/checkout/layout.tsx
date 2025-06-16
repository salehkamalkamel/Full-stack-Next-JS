import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import {
  OrderSummary,
  OrderSummarySkeleton,
} from "@/components/checkout/order-summary";
import React, { Suspense } from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 container mx-auto px-4 py-6">
      {/* Left Section - Main Content */}
      <div className="lg:col-span-2">
        {/* Removed extra wrapper and container nesting for cleaner structure */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
          <CheckoutProgress />
          {children}
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {/* Add back dynamic order summary when data is available */}
          <Suspense fallback={<OrderSummarySkeleton />}>
            <OrderSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
