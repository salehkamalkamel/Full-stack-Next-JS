import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function InventoryStatus() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  const lowStockProducts = products.filter((product) => product.stock <= 5);
  const outOfStockProducts = products.filter((product) => product.stock === 0);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
        <CardDescription>Stock levels and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Total Products</div>
            <div className="text-sm font-medium">{products.length}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-md border p-2 text-center">
              <div className="text-xs text-muted-foreground">In Stock</div>
              <div className="text-lg font-medium text-green-600">
                {products.length - outOfStockProducts.length}
              </div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-xs text-muted-foreground">Low Stock</div>
              <div className="text-lg font-medium text-amber-600">
                {lowStockProducts.length}
              </div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-xs text-muted-foreground">Out of Stock</div>
              <div className="text-lg font-medium text-red-600">
                {outOfStockProducts.length}
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="text-sm font-medium mb-2">Low Stock Alerts</div>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-md">
                      <Image
                        fill
                        src={product.images[0].url || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="text-sm font-medium">{product.name}</div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      product.stock > 5
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
