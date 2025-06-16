import { prisma } from "@/lib/prisma";
import PromoCode from "./promo-code";

export async function OrderSummary() {
  // const { shippingMethod } = useCheckout();
  const isEditable = true;
  const taxRate = process.env.NEXT_PUBLIC_TAX_RATE || "0.08"; // Default tax rate
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const cartData = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
  });
  const shippingMethod = {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
  };
  const calculatedTotals = () => {
    const subtotal = cartData.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const tax = (subtotal * parseFloat(taxRate)) / 100 || 0;
    const total = subtotal + tax + (shippingMethod?.price || 0);

    return { subtotal, tax, total };
  };

  return (
    <div className="space-y-4">
      {/* Order items summary */}
      <div className="space-y-3 mb-6">
        {cartData.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div className="flex-1">
              <span className="font-medium">{item.product.name}</span>
              <span className="text-gray-500 ml-1">× {item.quantity}</span>
            </div>
            <div className="text-right font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Promo code section */}
      {isEditable && <PromoCode />}

      {/* Order totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            ${calculatedTotals().subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            ${shippingMethod?.price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">
            ${calculatedTotals().tax.toFixed(2) || "0.00"}
          </span>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200 text-base font-medium">
          <span>Total</span>
          <span>${calculatedTotals().total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-3 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between text-sm animate-pulse"
          >
            <div className="flex-1 bg-gray-200 h-4 rounded"></div>
            <div className="bg-gray-200 h-4 w-16 rounded"></div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between text-sm animate-pulse"
          >
            <div className="flex-1 bg-gray-200 h-4 rounded"></div>
            <div className="bg-gray-200 h-4 w-16 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
