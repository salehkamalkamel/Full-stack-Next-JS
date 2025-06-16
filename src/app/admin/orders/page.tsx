import { Suspense } from "react";
import { OrderFilters } from "@/components/admin/orders/order-filters";
import { BulkActions } from "@/components/admin/orders/bulk-actions";
import { Separator } from "@/components/ui/separator";
import { OrdersTableSkeleton } from "@/components/admin/orders/orders-table-skeleton";
import OrdersHeader from "@/components/admin/orders/orders-header";
import OrdersFetcher from "@/components/admin/orders/orders-fetcher";
import { OrderStatus } from "@prisma/client";

export const metadata = {
  title: "Orders Management",
  description: "Manage customer orders and track order status",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: OrderStatus | "all";
    query?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}) {
  const params = await searchParams;
  const filter = {
    status: (params?.status as OrderStatus) ?? "all",
    query: params?.query ?? "",
    date: {
      from: params?.dateFrom ? new Date(params.dateFrom as string) : undefined,
      to: params?.dateTo ? new Date(params.dateTo as string) : undefined,
    },
  };
  return (
    <div className="flex flex-col gap-6">
      <OrdersHeader />
      <Separator />
      <OrderFilters />
      <BulkActions />
      <Suspense
        fallback={<OrdersTableSkeleton />}
        key={filter.status + filter.query + filter.date.from + filter.date.to}
      >
        <OrdersFetcher filter={filter} />
      </Suspense>
    </div>
  );
}
