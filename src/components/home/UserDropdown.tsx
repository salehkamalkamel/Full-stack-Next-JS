"use client";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { type User as UserType } from "better-auth";

type UserDropdownProp = {
  user: UserType | null;
};

export default function UserDropdown({ user }: UserDropdownProp) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSignOut() {
    startTransition(async () => {
      await authClient.signOut();
      router.push("/login");
    });
  }
  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={!user}
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="text-foreground/70 hover:text-foreground"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/account">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/orders">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/wishlist">Wishlist</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin">Admin Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              disabled={isPending}
              className="w-full"
              onClick={handleSignOut}
            >
              {isPending ? "Signing out..." : "Sign Out"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
