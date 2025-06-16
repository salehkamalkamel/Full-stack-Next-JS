import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { CartSheet } from "../cart-sheet";
import UserDropdown from "../home/UserDropdown";
import { prisma } from "@/lib/prisma";
import { getCartLengthAction } from "@/actions/cart-action";
import { User } from "better-auth";

type HeaderActionsType = {
  user: User | null;
};

export default async function HeaderActions({ user }: HeaderActionsType) {
  const wishListLength = await prisma.wishListItem.count();
  const cartLength = await getCartLengthAction();
  const cartData = await prisma.cartItem.findMany({
    include: {
      product: {
        include: {
          images: true,
        },
      },
    },
  });

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Link href="/wishlist" className="hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Wishlist"
          className="text-foreground/70 hover:text-foreground relative"
        >
          <Heart className="h-5 w-5" />
          {wishListLength > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {wishListLength}
            </span>
          )}
          <span className="sr-only">Wishlist</span>
        </Button>
      </Link>

      {user && <CartSheet cartLength={cartLength} cartData={cartData} />}
      <UserDropdown user={user} />
      {user !== null ? (
        <p className="text-sm hidden md:flex">{user.name}</p>
      ) : (
        <Button asChild className="hidden md:flex ml-2">
          <Link href="/login">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
