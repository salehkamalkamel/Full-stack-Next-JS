import { prisma } from "@/lib/prisma";
import { OrdersTable } from "./orders-table";
import { OrderStatus, Prisma } from "@prisma/client";

type OrdersFetcherProps = {
  filter: {
    status: OrderStatus | "all";
    query: string;
    date: {
      from?: Date | undefined;
      to?: Date | undefined;
    };
  };
};

export default async function OrdersFetcher({ filter }: OrdersFetcherProps) {
  const where: Prisma.OrderWhereInput = {};

  if (filter.status !== "all") {
    where.status = filter.status.toUpperCase() as OrderStatus;
  }

  if (filter.date.from || filter.date.to) {
    where.createdAt = {};
    if (filter.date.from) where.createdAt.gte = filter.date.from;
    if (filter.date.to) where.createdAt.lte = filter.date.to;
  }

  if (filter.query) {
    where.OR = [
      {
        user: {
          name: {
            contains: filter.query,
          },
        },
      },
      {
        id: filter.query,
      },
    ];
  }

  const ordersData = await prisma.order.findMany({
    where,
    include: {
      user: true,
    },
  });
  return <OrdersTable orders={ordersData} />;
}
