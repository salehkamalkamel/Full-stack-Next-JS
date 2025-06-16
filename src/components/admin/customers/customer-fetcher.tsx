import { prisma } from "@/lib/prisma";
import { CustomersTable } from "./customers-table";
import { Prisma, UserRole, UserStatus } from "@prisma/client";

type CustomersFetcherProps = {
  searchParams: {
    query?: string;
    status?: UserStatus | "all";
    role?: UserRole | "all";
    joinDate?: string;
  };
};

export default async function CustomersFetcher({
  searchParams,
}: CustomersFetcherProps) {
  const where: Prisma.UserWhereInput = {};

  if (searchParams.status !== "all") {
    where.status = searchParams.status?.toUpperCase() as UserStatus;
  }

  if (searchParams.role !== "all") {
    where.role = searchParams.role?.toUpperCase() as UserRole;
  }

  if (searchParams.joinDate) {
    where.createdAt = {};
    where.createdAt.gte = new Date(searchParams.joinDate);
  }

  if (searchParams.query) {
    where.OR = [
      {
        name: {
          contains: searchParams.query,
        },
      },
      {
        email: {
          contains: searchParams.query,
        },
      },
    ];
  }

  const users = await prisma.user.findMany({
    where,
  });
  return <CustomersTable users={users} />;
}
