import ProductActions from "@/components/admin/main/ProductActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ProductsBody({
  searchParams,
}: {
  searchParams: string;
}) {
  const productsData = await prisma.product.findMany({
    where: {
      name: {
        contains: searchParams,
      },
    },
    include: {
      images: true,
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsData.length > 0 ? (
          productsData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src={product.images[0].url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    // product.stock === "In Stock"
                    true
                      ? "bg-green-50 text-green-700"
                      : //   : product.stock === "Low Stock"
                      product.stock
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {product.stock}
                </span>
              </TableCell>
              <ProductActions
                productId={product.id}
                productName={product.name}
              />
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-sm text-gray-500 py-6"
            >
              No Products Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
