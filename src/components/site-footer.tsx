import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">GameVault</h3>
          <p className="text-sm text-muted-foreground">
            Premium digital games store with an Apple-inspired design aesthetic.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/games"
                className="text-muted-foreground hover:text-foreground"
              >
                All Games
              </Link>
            </li>
            <li>
              <Link
                href="/games?category=action"
                className="text-muted-foreground hover:text-foreground"
              >
                Action
              </Link>
            </li>
            <li>
              <Link
                href="/games?category=adventure"
                className="text-muted-foreground hover:text-foreground"
              >
                Adventure
              </Link>
            </li>
            <li>
              <Link
                href="/games?category=rpg"
                className="text-muted-foreground hover:text-foreground"
              >
                RPG
              </Link>
            </li>
            <li>
              <Link
                href="/games?category=strategy"
                className="text-muted-foreground hover:text-foreground"
              >
                Strategy
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Account</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/account"
                className="text-muted-foreground hover:text-foreground"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                href="/account/orders"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="text-muted-foreground hover:text-foreground"
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/refund"
                className="text-muted-foreground hover:text-foreground"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GameVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
