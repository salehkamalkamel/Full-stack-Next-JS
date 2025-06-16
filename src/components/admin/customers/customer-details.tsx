import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";

interface CustomerDetailsProps {
  user: Prisma.UserGetPayload<{
    include: {
      wishList: true;
      cartList: true;
      Order: true;
      sessions: true;
      accounts: true;
    };
  }>;
}

export function CustomerDetails({ user }: CustomerDetailsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Personal details and account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.image || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback className="text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col gap-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      user.status === "ACTIVE" ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span className="capitalize">{user.status}</span>
                </div>
                <div className="rounded-full bg-muted px-2 py-1 text-xs">
                  Member since {formatDate(user.createdAt)}
                </div>
                <div className="rounded-full bg-muted px-2 py-1 text-xs">
                  Last login:{" "}
                  {formatDate(
                    user.sessions[user.sessions.length - 1].createdAt ||
                      new Date()
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{"Not provided"}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Account Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User ID</span>
                  <span className="font-mono text-xs">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="capitalize">{user.status}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>
              User&#39;s shipping and billing addresses
            </CardDescription>
          </CardHeader>
          {/* <CardContent>
            {user.address ? (
              <div className="space-y-1">
                <p>{user.address.line1}</p>
                {user.address.line2 && <p>{user.address.line2}</p>}
                <p>
                  {user.address.city}, {user.address.state}{" "}
                  {user.address.postal_code}
                </p>
                <p>{user.address.country}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No address information provided
              </p>
            )}
          </CardContent> */}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Saved payment methods</CardDescription>
          </CardHeader>
          {/* <CardContent>
            {user.paymentMethods && user.paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {user.paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      {method.type === "card" ? (
                        <span className="text-xs font-medium">
                          {method.brand}
                        </span>
                      ) : (
                        <span className="text-xs font-medium">PayPal</span>
                      )}
                    </div>
                    <div>
                      {method.type === "card" ? (
                        <p className="font-medium">
                          {method.brand} ending in {method.last4}
                        </p>
                      ) : (
                        <p className="font-medium">PayPal</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No payment methods saved</p>
            )}
          </CardContent> */}
        </Card>
      </div>
    </div>
  );
}
