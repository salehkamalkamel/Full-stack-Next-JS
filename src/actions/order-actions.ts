"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createOrder(
  shippingAddressId: string,
  shippingPrice: number,
  deleveryNumberOfDays: number
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Adding Order Error: user is not Authenticated");
  }

  const userId = session.user.id;
  const taxRate = process.env.NEXT_PUBLIC_TAX_VALUE || "0";
  const deliveryDate = new Date(
    Date.now() + deleveryNumberOfDays * 24 * 60 * 60 * 1000
  );

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.quantity * item.product.price;
  }

  const tax = (totalPrice * parseFloat(taxRate)) / 100 || 0;
  totalPrice += tax;
  totalPrice += shippingPrice;

  const response = await prisma.order.create({
    data: {
      userId,
      status: "PENDING" as OrderStatus,
      shippingPrice,
      tax,
      totalPrice,
      deliveryDate,
      shippingAddressId,
      orderItems: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: { orderItems: true },
  });

  await prisma.cartItem.deleteMany({ where: { userId } });
  revalidatePath("/checkout");
  revalidatePath("/account");
  revalidatePath("/admin/orders");
  // redirect("/account");
  return response;
}

export async function getOrderById(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      shippingAddress: true,
      orderItems: { include: { product: { include: { images: true } } } },
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
}

export type OrderWithDetailsType = Prisma.OrderGetPayload<{
  include: {
    user: true;
    shippingAddress: true;
    orderItems: { include: { product: { include: { images: true } } } };
  };
}>;

export type OrderWithUserType = Prisma.OrderGetPayload<{
  include: {
    user: true;
  };
}>;

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });
  // add the right path
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/account/orders");
  return order;
}

export async function listOrdersForUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Adding Order Error: user is not Authenticated");
  }

  const userId = session.user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
  return orders;
}

export async function cancelOrder(orderId: string) {
  const response = await updateOrderStatus(orderId, "CANCELLED");
  revalidatePath("/account/orders");
  return response;
}

export async function completeOrder(orderId: string) {
  return prisma
    .$transaction(async (prisma) => {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { orderItems: { include: { product: true } } },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.status !== "PENDING") {
        throw new Error("Order is not pending");
      }

      for (const item of order.orderItems) {
        const product = item.product;
        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: "COMPLETED" },
      });

      return updatedOrder;
    })
    .then((updatedOrder) => {
      revalidatePath("/orders");
      revalidatePath(`/orders/${updatedOrder.id}`);
      return updatedOrder;
    });
}

export async function deleteOrder(orderId: string) {
  const response = await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
  revalidatePath("/account/orders");
  return response;
}
