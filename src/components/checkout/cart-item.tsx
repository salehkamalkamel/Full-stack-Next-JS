"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { editCartItemAction, removeFromCart } from "@/actions/cart-action";
import { cartDataType } from "@/lib/types/cart-types";
import { Button } from "../ui/button";

export default function CartItem({ item }: { item: cartDataType }) {
  const [isPendingCartUpdate, startTransitionCartUpdate] = useTransition();
  const [isPendingRemoveItem, startTransitionRemoveItem] = useTransition();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    startTransitionCartUpdate(async () => {
      await editCartItemAction(id, quantity);
    });
  };

  const removeItem = (id: string) => {
    startTransitionRemoveItem(async () => {
      await removeFromCart(id);
    });
  };
  return (
    <div key={item.id} className="flex items-start border-b pb-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.product.images[0].url || "/placeholder.svg"}
          alt={item.product.name}
          width={96}
          height={96}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {item.product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Item #{item.id}</p>
          </div>
          <p className="text-base font-medium text-gray-900">
            ${item.product.price.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={isPendingCartUpdate}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="px-2 text-gray-900 select-none">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              disabled={isPendingCartUpdate}
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button
            variant="outline"
            disabled={isPendingRemoveItem}
            type="button"
            className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {isPendingRemoveItem ? "Removing..." : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  );
}
