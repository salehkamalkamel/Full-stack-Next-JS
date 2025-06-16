import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, Package, Settings, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function AccountSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <Card className="h-fit">
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="w-full text-center">User Not Authenticated</p>
            <Button variant="default" asChild>
              <Link href="/login">Go To Login Page</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userData) {
    return (
      <Card className="h-fit">
        <CardContent className="p-4">
          <p className="w-full text-center">No data avilable for this user!</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="h-fit">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-4 mb-6 pt-2">
          <div className="relative h-12 w-12 overflow-hidden rounded-full opacity-75">
            {userData.image ? (
              <Image
                src={userData.image || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="object-cover"
              />
            ) : (
              <UserCircle className="w-full h-full" />
            )}
          </div>
          <div>
            <div className="font-medium">{userData.name}</div>
            <div className="text-sm text-muted-foreground">
              {userData.email}
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <Button
            variant="link"
            asChild
            // variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link
              href="/account/"
              className="flex gap-2 items-center justify-center"
            >
              <User className="mr-2 h-4 w-4" />
              Overview
            </Link>
          </Button>
          <Button
            variant="link"
            asChild
            // variant={activeTab === "orders" ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link
              href="/account/orders"
              className="flex gap-2 items-center justify-center"
            >
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>
          <Button
            variant="link"
            asChild
            // variant={activeTab === "wishlist" ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link
              href="/account/wishlist"
              className="flex gap-2 items-center justify-center"
            >
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Link>
          </Button>
          {/* Payment Method will be added latter */}
          {/* <Button
            variant={activeTab === "payment" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => handleActiveTab("payment")}
          >
            <Link
              href="/account/overview"
              className="flex gap-2 items-center justify-center"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </Link>
          </Button> */}
          <Button
            variant="link"
            asChild
            // variant={activeTab === "settings" ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link
              href="/account/setting"
              className="flex gap-2 items-center justify-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
