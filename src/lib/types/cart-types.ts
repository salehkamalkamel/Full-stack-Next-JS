import { Prisma } from "@prisma/client";

export type cartDataType = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        images: true;
      };
    };
  };
}>;
