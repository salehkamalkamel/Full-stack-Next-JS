"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { UserRole, UserStatus } from "@prisma/client";

// Get current authenticated user
export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("User not authenticated");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      wishList: true,
      cartList: true,
      Order: true,
      sessions: true,
      accounts: true,
    },
  });
  return user;
}

// Get all users (admin only)
export async function getAllUsers() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Access denied");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users;
}

// Update user info
export async function updateUserInfo(
  userId: string,
  data: Partial<{
    name: string;
    email: string;
    image: string;
    role: UserRole;
    status: UserStatus;
  }>
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (
    !session ||
    (session.user.id !== userId && session.user.role !== "ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/");
  return updatedUser;
}

// Ban a user (admin only)
export async function banUser(
  userId: string,
  reason: string,
  expires: Date | null = null
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Access denied");
  }

  const bannedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      banned: true,
      banReason: reason,
      banExpires: expires,
      status: "BANNED",
      updatedAt: new Date(),
    },
  });

  return bannedUser;
}

// Unban a user (admin only)
export async function unbanUser(userId: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Access denied");
  }

  const unbannedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      banned: false,
      banReason: null,
      banExpires: null,
      status: "ACTIVE",
      updatedAt: new Date(),
    },
  });

  return unbannedUser;
}

// Delete user account (user or admin)
export async function deleteUser(userId: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (
    !session ||
    (session.user.id !== userId && session.user.role !== "ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/");
  return { success: true };
}

export async function getUserActivities(userId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Get User Activities Error: user is not authenticated");
  }

  const [user, orders, wishlist, cart, sessions] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.wishListItem.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.cartItem.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  if (!user) throw new Error("User not found");

  return {
    user: { id: user.id, name: user.name, email: user.email },
    recentOrders: orders,
    recentWishlist: wishlist,
    recentCart: cart,
    recentSessions: sessions,
  };
}
