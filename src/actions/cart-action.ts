"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addToCart(productId: string, count: number = 1) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("User is not authenticated!");
    }

    const response = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: productId,
        },
      },
      update: {
        quantity: {
          increment: count,
        },
      },
      create: {
        userId: session.user.id,
        productId: productId,
        quantity: count,
      },
    });

    revalidatePath("/games");
    revalidatePath(`/games/${productId}`);
    revalidatePath("/");

    return response;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      throw new Error("This product is already in your cart.");
    }
    console.error(e);
    throw new Error("Failed to add product to cart!");
  }
}

export async function removeFromCart(itemId: string) {
  try {
    const response = await prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });

    if (!response) {
      throw new Error("Unable to delete item from cart!");
    }
    revalidatePath("/games");
    revalidatePath(`/games/${itemId}`);
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error("Feild to delete item from cart!");
  }
}

export async function clearCart() {
  try {
    const response = await prisma.cartItem.deleteMany();

    if (!response) {
      throw new Error("Unable to clear cart!");
    }

    revalidatePath("/games");
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error("Feild to clear cart!");
  }
}

export async function getCurrentCartItems() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("User is not authenticated!");
    }

    const response = await prisma.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Feild to get cart items!");
  }
}

export async function editCartItemAction(itemId: string, quantity: number) {
  try {
    const response = await prisma.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity,
      },
    });

    if (!response) {
      throw new Error("Unable to Edit cart item!");
    }

    revalidatePath("/games");
    revalidatePath("/checkout");
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error("Feild to Edit cart item!");
  }
}

export async function getCartLengthAction() {
  try {
    const response = (await prisma.cartItem.count()) || 0;

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Feild to get cart items count!");
  }
}

export async function isAddedToCart(gameId: string) {
  try {
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("Wish list access Error: User is not authenticated!");
    }
    const response = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: sesstion.user.id,
          productId: gameId,
        },
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Feild to get cart item!");
  }
}

export type IsAddedToCartType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  productId: string;
  quantity: number;
};
