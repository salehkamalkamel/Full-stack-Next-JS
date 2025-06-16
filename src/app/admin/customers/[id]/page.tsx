import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomerDetails } from "@/components/admin/customers/customer-details";
import { CustomerActivity } from "@/components/admin/customers/customer-activity";
import { CustomerActions } from "@/components/admin/customers/customer-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { getUserById } from "@/actions/users-actions";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/customers">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to customers</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <CustomerActions user={user} />
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CustomerDetails user={user} />
        </div>
        <div>
          <CustomerActivity userId={user.id} />
        </div>
      </div>
    </div>
  );
}
