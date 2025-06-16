"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ShippingAddressFormType,
  shippingAddressSchema,
} from "@/lib/schemas/shipping-form-schema";
import { headers } from "next/headers";

export async function AddShippingAdressAction(
  formData: ShippingAddressFormType
) {
  try {
    const parsedData = shippingAddressSchema.safeParse(formData);
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("Shipping Form Server action error: No session found");
    }

    if (!parsedData.success) {
      throw new Error(
        "Shipping Form Server action error: Zod schema Validation Error"
      );
    }

    const response = await prisma.address.create({
      data: parsedData.data,
    });

    if (!response) {
      throw new Error(
        "Shipping Form Server action error: Adding to Prisma Error"
      );
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(
      "Shipping Form Server action error:Feild to Submit Shipping form"
    );
  }
}
