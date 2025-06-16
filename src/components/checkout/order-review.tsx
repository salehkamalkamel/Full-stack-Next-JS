import type React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentCartItems } from "@/actions/cart-action";
import { prisma } from "@/lib/prisma";
import OrderSubmit from "./order-submit";

export default async function OrderReview({
  addressId,
}: {
  addressId: string | null;
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const cartData = await getCurrentCartItems();
  const selectedAddress = await prisma.address.findUnique({
    where: {
      id: addressId as string,
    },
  });
  const shippingMethod = {
    deleveryNumberOfDays: 3,
    price: 5.99,
    name: "Standard Shipping",
    id: "standard",
  };

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
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

      {/* Items summary */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-2 font-medium">
          Items ({cartData.reduce((sum, item) => sum + item.quantity, 0)})
        </div>
        <div className="divide-y">
          {cartData.map((item) => (
            <div key={item.id} className="flex items-center p-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={item.product.images[0].url || "/placeholder.svg"}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-base font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping information */}
      <div className="grid grid-cols-1  gap-6 mb-6">
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-medium">
            Shipping Address
          </div>
          <div className="p-4">
            {selectedAddress && (
              <address className="not-italic">
                {selectedAddress.firstName}
                {selectedAddress.lastName}
                <br />
                {selectedAddress.address1}
                <br />
                {selectedAddress.address2 && (
                  <>
                    {selectedAddress.address2}
                    <br />
                  </>
                )}
                {selectedAddress.city}, {selectedAddress.state}{" "}
                {selectedAddress.postalCode}
                <br />
                {selectedAddress.country}
                <br />
                {selectedAddress.phone}
              </address>
            )}
          </div>
        </div>
      </div>

      {/* Shipping method */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-2 font-medium">Shipping Method</div>
        <div className="p-4">
          {shippingMethod && (
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{shippingMethod.name}</p>
                <p className="text-sm text-gray-500">
                  {shippingMethod.deleveryNumberOfDays}
                </p>
              </div>
              <p className="font-medium">${shippingMethod.price.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment method */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-2 font-medium">Payment Method</div>
        <div className="p-4">
          <div>
            <div className="flex items-center">
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Credit Card</p>
                <p className="text-sm text-gray-500">**** **** **** ****</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderSubmit addressId={addressId} />
    </div>
  );
}

export function OrderReviewSkeleton() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

      {/* Items summary */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-2 font-medium">Items (3)</div>
        <div className="divide-y">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center p-4 animate-pulse">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-gray-200"></div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 bg-gray-200 h-5 w-32"></h3>
                    <p className="mt-1 text-sm text-gray-500 bg-gray-200 h-4 w-16"></p>
                  </div>
                  <p className="text-base font-medium text-gray-900 bg-gray-200 h-5 w-16"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping information */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-medium">
            Shipping Address
          </div>
          <div className="p-4 animate-pulse space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="block bg-gray-200 h-4 w-full"></span>
            ))}
          </div>
        </div>
      </div>

      {/* Shipping method */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-2 font-medium">Shipping Method</div>
        <div
          className="p-4 animate-pulse space-y-
2"
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index} className="block bg-gray-200 h-4 w-full"></span>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-2 font-medium">Payment Method</div>
        <div className="p-4 animate-pulse space-y-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index} className="block bg-gray-200 h-4 w-full"></span>
          ))}
        </div>
      </div>

      {/* Terms and conditions */}
      {/* <div className="space-y-4 animate-pulse">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={false} disabled />
          <Label htmlFor="terms" className="text-sm bg-gray-200 h-4 w-64"></Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" checked={false} disabled />
          <Label htmlFor="marketing" className="text-sm bg-gray-200 h-4 w-64"></Label>
        </div>
      </div> */}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" asChild disabled>
          <Link href={"/checkout/shipping"}>Back to shipping</Link>
        </Button>

        <Button type="submit" disabled>
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
        </Button>
      </div>
    </div>
  );
}
