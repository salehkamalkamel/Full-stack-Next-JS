import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export default async function WishlistPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>{"Games you've saved for later."}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <Button asChild>
            <Link href="/wishlist">Go to Wishlist</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
