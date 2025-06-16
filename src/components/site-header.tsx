import MobileMenu from "./header/mobile-menu";
import DesktopNavigation from "./header/desktop-nav";
import HeaderActions from "./header/header-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function SiteHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;
  return (
    <header
      className={
        "px-4 sm:px-6 sticky top-0 z-50 w-full transition-all duration-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
      }
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Mobile Menu Trigger */}
        <MobileMenu user={user} />

        {/* Logo and Desktop Navigation */}
        <DesktopNavigation />

        {/* Right Side Actions */}
        <HeaderActions user={user} />
      </div>
    </header>
  );
}
