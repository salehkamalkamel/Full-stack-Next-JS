import ProductsBody from "@/components/admin/main/ProductsTable";
import { OrdersTableSkeleton } from "@/components/admin/orders/orders-table-skeleton";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/admin/products/search-bar";
import { Card, CardContent } from "@/components/ui/card";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const query = (await searchParams).search || "";
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold tracking-tight">Products List</h2>
        <div className="flex items-center gap-2">
          <SearchBar />
          <Button asChild>
            <Link
              href="/admin/products/add"
              className="flex items-center justify-center gap-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>
      <Card className="w-full">
        <CardContent className="p-0">
          <Suspense fallback={<OrdersTableSkeleton />}>
            <ProductsBody searchParams={query} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
