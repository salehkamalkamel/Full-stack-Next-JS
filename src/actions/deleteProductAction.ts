"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/admin/products");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to delete this Product");
  }
}
