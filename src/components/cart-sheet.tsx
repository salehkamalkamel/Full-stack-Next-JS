"use client";

import React, { useState, useTransition, useCallback, useMemo } from "react";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cartDataType } from "@/lib/types/cart-types";
import {
  clearCart,
  removeFromCart,
  editCartItemAction,
} from "@/actions/cart-action";

// Optionally, extract CartItem as a separate memoized component if needed:
const CartItem = React.memo(function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  isPendingUpdate,
  isPendingRemoveItem,
}: {
  item: cartDataType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  isPendingUpdate: boolean;
  isPendingRemoveItem: boolean;
}) {
  return (
    <li key={item.id} className="flex py-6">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.product.images[0].url || "/placeholder.svg"}
          alt={item.product.name}
          width={80}
          height={80}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3>
            <Link href={`/games/${item.product.id}`} onClick={() => {}}>
              {item.product.name}
            </Link>
          </h3>
          <p className="ml-4">${item.product.price.toFixed(2)}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={isPendingUpdate || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="text-muted-foreground w-4 text-center">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={isPendingUpdate}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={() => onRemove(item.id)}
            disabled={isPendingRemoveItem}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </li>
  );
});

export function CartSheet({
  cartLength,
  cartData,
}: {
  cartLength: number;
  cartData: cartDataType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingRemoveItem, startTransitionRemove] = useTransition();
  const [isPendingClearCart, startTransitionClearCart] = useTransition();
  const [isPendingUpdate, startTransitionUpdate] = useTransition();

  // Memoized handler for removing an item
  const handleRemove = useCallback(
    (itemId: string) => {
      startTransitionRemove(async () => {
        try {
          await removeFromCart(itemId);
        } catch (err) {
          console.error(err);
          // Optionally, show a toast or user-friendly error
        }
      });
    },
    [startTransitionRemove]
  );

  // Memoized handler for clearing the cart
  const handleClearCart = useCallback(() => {
    startTransitionClearCart(async () => {
      try {
        await clearCart();
      } catch (err) {
        console.error(err);
      }
    });
  }, [startTransitionClearCart]);

  // Memoized handler for updating quantity
  const handleUpdateQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      startTransitionUpdate(async () => {
        try {
          await editCartItemAction(itemId, newQuantity);
        } catch (err) {
          console.error(err);
        }
      });
    },
    [startTransitionUpdate]
  );

  // Memoize computed values to avoid recalculating on every render
  const subtotal = useMemo(() => {
    return cartData.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cartData]);

  const tax = useMemo(() => subtotal * 0.1, [subtotal]); // 10% tax
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Cart"
          className="text-foreground/70 hover:text-foreground relative"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
          {cartLength > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {cartLength}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full px-6 flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Shopping Cart {cartData.length} Items</SheetTitle>
        </SheetHeader>
        {cartData.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <ul className="divide-y">
                {cartData.map((item) => (
                  <CartItem
                    isPendingRemoveItem={isPendingRemoveItem}
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onUpdateQuantity={handleUpdateQuantity}
                    isPendingUpdate={isPendingUpdate}
                  />
                ))}
              </ul>
            </div>
            <div className="border-t pt-6">
              <div className="flex justify-between text-base">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base mt-2">
                <p>Tax</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium mt-4">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  disabled={isPendingClearCart}
                  onClick={handleClearCart}
                  variant="destructive"
                >
                  {isPendingClearCart ? "Clearing Cart..." : "Clear Cart"}
                </Button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                <p>
                  or{" "}
                  <Link
                    href="/games"
                    className="font-medium text-primary hover:text-primary/80"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground mt-1">
                {"Looks like you haven't added any games yet."}
              </p>
            </div>
            <Button variant="default" onClick={() => setIsOpen(false)} asChild>
              <Link href="/games">Browse Games</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
