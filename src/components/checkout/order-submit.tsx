"use client";
import { createOrder } from "@/actions/order-actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderSubmit({ addressId }: { addressId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const shippingMethod = {
    deleveryNumberOfDays: 3,
    price: 5.99,
    name: "Standard Shipping",
    id: "standard",
  };

  async function handlePlaceOrder() {
    startTransition(async () => {
      await createOrder(
        addressId,
        shippingMethod.price,
        shippingMethod.deleveryNumberOfDays
      )
        .then(() => {
          toast.success("Order placed successfully!");
          router.push("/account/orders");
        })
        .catch((error) => {
          console.error("Error placing order:", error);
          toast.error("Failed to place order. Please try again.");
        });
    });
  }

  return (
    <div className="flex justify-between pt-4">
      <Button type="button" variant="outline" asChild>
        <Link href={"/checkout/shipping"}>Back to shipping</Link>
      </Button>

      <Button onClick={handlePlaceOrder} disabled={isPending}>
        {isPending ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Placing order...
          </div>
        ) : (
          "Place Order"
        )}
      </Button>
    </div>
  );
}
