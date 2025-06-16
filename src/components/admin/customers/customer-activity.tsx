import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserActivity } from "@/lib/users-data";
import { formatDate } from "@/lib/utils";
import { Clock, CreditCard, LogIn, Package, ShoppingCart } from "lucide-react";

interface CustomerActivityProps {
  userId: string;
}

export function CustomerActivity({ userId }: CustomerActivityProps) {
  const activities = getUserActivity(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>User&#39;s recent actions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No recent activity
            </p>
          ) : (
            activities.map((activity) => {
              // Determine icon based on activity type
              let Icon = Clock;
              if (activity.type === "login") Icon = LogIn;
              if (activity.type === "order") Icon = Package;
              if (activity.type === "cart") Icon = ShoppingCart;
              if (activity.type === "payment") Icon = CreditCard;

              return (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{activity.description}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
