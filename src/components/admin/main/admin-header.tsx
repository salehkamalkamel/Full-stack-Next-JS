"use client";

import { usePathname } from "next/navigation";
import { Package2, Menu, LogOut, User, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminSidebar } from "./admin-sidebar";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { toast } from "sonner";
export function AdminHeader() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  // Function to get the current page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname === "/admin/products") return "Products";
    if (pathname.startsWith("/admin/products/add")) return "Add Product";
    if (pathname === "/admin/orders") return "Orders";
    if (pathname === "/admin/customers") return "Customers";
    if (pathname === "/admin/settings") return "Settings";
    if (pathname === "/admin/analytics") return "Analytics";
    if (pathname === "/admin/categories") return "Categories";
    if (pathname === "/admin/payments") return "Payments";

    return "Admin";
  };

  function handleLogout() {
    startTransition(async () => {
      await authClient
        .signOut()
        .then(() => {
          router.push("/login");
          toast.success("Logged out successfully", {
            description: "You have been logged out of your account.",
          });
        })
        .catch((error) => {
          toast.error("Logout failed", {
            description: `There was an error logging you out ${error} . Please try again.`,
          });
        });
    });
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span>GameVault Admin</span>
      </div>

      <div className="hidden md:block text-lg font-semibold ml-4">
        {getPageTitle()}
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* <form className="hidden md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] lg:w-[300px] pl-8"
          />
        </form> */}

        {/* <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
              <LogOut className="mr-2 h-4 w-4" />
              {isPending ? "Logging out..." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
