import { Suspense } from "react";
import { CustomerFilters } from "@/components/admin/customers/customer-filters";
import { CustomersTableSkeleton } from "@/components/admin/customers/customers-table-skeleton";
import { Separator } from "@/components/ui/separator";
import CustomerPageHeader from "@/components/admin/customers/customer-page-header";
import CustomersFetcher from "@/components/admin/customers/customer-fetcher";
import { UserRole, UserStatus } from "@prisma/client";

export const metadata = {
  title: "Customer Management",
  description: "Manage customer accounts and user roles",
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | null;
    role?: string | null;
    query?: string | null;
    joinDate?: string | null;
  }>;
}) {
  const params = await searchParams;
  const filter = {
    status: (params?.status as UserStatus) ?? "all",
    role: (params?.role as UserRole) ?? "all",
    query: params?.query ?? "",
    joinDate: params?.joinDate
      ? new Date(params.joinDate as string).toISOString()
      : undefined,
  };
  return (
    <div className="flex flex-col gap-6">
      <CustomerPageHeader />
      <Separator />
      <CustomerFilters />
      <Suspense
        fallback={<CustomersTableSkeleton />}
        key={filter.status + filter.query + filter.role + filter.joinDate}
      >
        <CustomersFetcher searchParams={filter} />
      </Suspense>
    </div>
  );
}
