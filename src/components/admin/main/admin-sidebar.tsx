"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Users, ShoppingCart, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const mainLinks: SidebarLink[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/admin/customers",
    label: "Customers",
    icon: Users,
  },
];

// const otherLinks: SidebarLink[] = [
//   {
//     href: "/admin/analytics",
//     label: "Analytics",
//     icon: BarChart3,
//   },
//   {
//     href: "/admin/categories",
//     label: "Categories",
//     icon: Tag,
//   },
//   {
//     href: "/admin/payments",
//     label: "Payments",
//     icon: CreditCard,
//   },
//   {
//     href: "/admin/settings",
//     label: "Settings",
//     icon: Settings,
//   },
// ];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Store Management
              </h2>
              <div className="space-y-1">
                {mainLinks.map((link) => (
                  <TooltipProvider key={link.href} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={
                            pathname === link.href ? "secondary" : "ghost"
                          }
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href={link.href}>
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.label}
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-1">
                        {link.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <Separator className="my-2" />
            {/* <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Administration
              </h2>
              <div className="space-y-1">
                {otherLinks.map((link) => (
                  <TooltipProvider key={link.href} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={
                            pathname === link.href ? "secondary" : "ghost"
                          }
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href={link.href}>
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.label}
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="ml-1">
                        {link.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div> */}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
