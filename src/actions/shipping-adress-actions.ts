"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ShippingAddressFormType,
  shippingAddressSchema,
} from "@/lib/schemas/shipping-form-schema";
import { headers } from "next/headers";

export async function addShippingAdressToUserAction(
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

    const response = await prisma.user.update({
      where: {
        id: sesstion.user.id,
      },
      data: {
        addresses: {
          create: {
            ...parsedData.data,
          },
        },
      },
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

export async function setDefaultShippingAddressAction(addressId: string) {
  try {
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("Shipping Form Server action error: No session found");
    }

    const response = await prisma.user.update({
      where: {
        id: sesstion.user.id,
      },
      data: {
        defaultShippingAddressId: addressId,
      },
    });

    if (!response) {
      throw new Error("Set Default Shipping Address Error");
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Set Default Shipping Address Error");
  }
}

export async function deleteShippingAddressAction(addressId: string) {
  try {
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("Shipping Form Server action error: No session found");
    }

    const response = await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    if (!response) {
      throw new Error("Delete Shipping Address Error");
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Delete Shipping Address Error");
  }
}

export async function getAllShippingAddressesAction() {
  try {
    const sesstion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesstion) {
      throw new Error("Shipping Form Server action error: No session found");
    }

    const response = await prisma.user.findUnique({
      where: {
        id: sesstion.user.id,
      },
      include: {
        addresses: true,
      },
    });

    if (!response) {
      throw new Error("Get All Shipping Addresses Error");
    }

    return response.addresses;
  } catch (err) {
    console.error(err);
    throw new Error("Get All Shipping Addresses Error");
  }
}

export async function updateShippingAddressAction(
  addressId: string,
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

    const response = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        ...parsedData.data,
      },
    });

    if (!response) {
      throw new Error("Update Shipping Address Error");
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error("Update Shipping Address Error");
  }
}
