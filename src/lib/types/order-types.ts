import { Prisma } from "@prisma/client";

export type OrderItemType = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: {
          include: {
            images: true;
          };
        };
      };
    };
  };
}>;
