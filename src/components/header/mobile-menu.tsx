"use client";
import { Menu, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { useState, useTransition } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type MobileMenuPropsType = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  } | null;
};
export default function MobileMenu({ user }: MobileMenuPropsType) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSignOut() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    });
  }
  return (
    <div className="md:hidden">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only">
          <Link href="/" className="flex items-center">
            <span className="font-semibold text-xl">GameVault</span>
          </Link>
        </SheetTitle>
        <SheetContent side="left" className="pr-0" aria-description="Menu">
          <div className="p-8 ">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="font-semibold text-xl">GameVault</span>
            </Link>
            <nav className="mt-8 flex flex-col gap-6">
              <Link
                href="/"
                className="text-lg font-medium transition-colors hover:text-foreground/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/games"
                className="text-lg font-medium transition-colors hover:text-foreground/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                href="/wishlist"
                className="text-lg font-medium transition-colors hover:text-foreground/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="/account"
                className="text-lg font-medium transition-colors hover:text-foreground/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
              {user && (
                <div className="w-full flex justify-start gap-4 items-center py-4">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full opacity-75">
                    {user?.image ? (
                      <Image
                        src={user?.image || "/placeholder.svg"}
                        alt={user?.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserCircle className="w-full h-full" />
                    )}
                  </div>
                  <p className="text-sm">{user?.name}</p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t">
                {user ? (
                  <Button
                    disabled={isPending}
                    onClick={handleSignOut}
                    className="w-full"
                    variant="destructive"
                  >
                    {isPending ? "Signing out..." : "Sign Out"}
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
