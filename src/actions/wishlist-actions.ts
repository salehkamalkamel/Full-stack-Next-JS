"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addToWishlist(productId: string) {
  try {
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("User Is not Authenticated!");
    }

    const response = await prisma.wishListItem.create({
      data: {
        productId,
        userId: sesstion.user.id,
      },
    });

    revalidatePath("/wishlist");
    revalidatePath("/");
    if (!response) {
      throw new Error("Failed to add to wish list!");
    }
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

export async function removeFromWishlist(itemId: string) {
  try {
    const response = await prisma.wishListItem.delete({
      where: {
        id: itemId,
      },
    });

    if (!response) {
      throw new Error("Cannot remove this Item");
    }

    revalidatePath("/wishlist");
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

export async function clearWishlist() {
  try {
    const response = await prisma.wishListItem.deleteMany();

    if (!response) {
      throw new Error("Cannot clear wish list!");
    }

    revalidatePath("/wishlist");
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

export async function isAddedToWishlist(productId: string) {
  try {
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("Wish list access Error: User is not authenticated!");
    }

    const product = await prisma.wishListItem.findUnique({
      where: {
        userId_productId: {
          productId,
          userId: sesstion.user.id,
        },
      },
    });

    return {
      state: !!product,
      data: product,
    };
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

export async function getWishList() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      throw new Error("User session not found");
    }
    const { user } = session;

    const wishList = await prisma.wishListItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });
    return wishList;
  } catch (err) {
    console.error(err);
    throw new Error(
      typeof err === "string" ? err : "An unknown error occurred"
    );
  }
}

export type IsAddedToWishlistType = {
  state: boolean;
  data: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    productId: string;
  } | null;
};
