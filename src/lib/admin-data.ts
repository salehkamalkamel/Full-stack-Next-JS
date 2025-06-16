"use server";

import { getDateRange } from "./helpers";
import { prisma } from "./prisma";

export async function getSalesByCategory(from: string) {
  try {
    const fromDate = getDateRange(from);

    const orders = await prisma.order.findMany({
      // Optionally filter by status if needed, e.g., only 'COMPLETED' orders
      // where: { status: 'COMPLETED' },
      include: {
        orderItems: {
          include: {
            product: {
              select: { category: true }, // Only select the category field
            },
          },
        },
      },
      where: {
        createdAt: {
          gte: fromDate, // Filter orders created from the specified date
        },
        status: "COMPLETED",
      },
    });

    const salesByCategory: { [key: string]: number } = {};
    let totalSales = 0;

    // Aggregate sales by category
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        // Ensure product and category exist
        if (item.product && item.product.category) {
          const category = item.product.category;
          // Calculate item total price (assuming item.price is price *per unit*)
          const itemTotal = item.price * item.quantity;
          salesByCategory[category] =
            (salesByCategory[category] || 0) + itemTotal;
          totalSales += itemTotal; // Add to overall total sales
        }
      });
    });

    if (totalSales === 0) {
      return { categoryData: [], totalSales: 0 };
    }

    // Calculate percentages and format the data
    const categoryData = Object.entries(salesByCategory)
      .map(([name, sales]) => ({
        name,
        sales,
        percentage: (sales / totalSales) * 100,
      }))
      // Sort categories by sales descending (most popular first)
      .sort((a, b) => b.sales - a.sales);

    return { categoryData, totalSales };
  } catch (error) {
    console.error("Error fetching sales by category:", error);
    // Return empty data in case of error
    return { categoryData: [], totalSales: 0 };
  }
}
