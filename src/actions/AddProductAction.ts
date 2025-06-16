// src/app/admin/products/add/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  productSchema,
  ProductSchemaType,
} from "@/lib/validators/productSchema";
import { uploadToPinata, getImageUrlFromPinataResponse } from "@/lib/pinata";
import { RequirementType, Prisma } from "@prisma/client"; // Import Prisma types if needed for error handling
import { prisma } from "@/lib/prisma";
import { CustomFormData, FormSubmitResponse, ImageFile } from "@/lib/types";
import { PinataPinResponse } from "@pinata/sdk";

export async function addProductAction(
  formData: CustomFormData
): Promise<FormSubmitResponse> {
  const rawData = formData as CustomFormData; // Assuming formData is already a CustomFormData object
  console.log("Form data from the action:", formData);
  // 2. Validate data
  const validationResult = productSchema.safeParse(rawData);

  if (!validationResult.success) {
    console.error(
      "Validation Failed:",
      validationResult.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: "Validation failed.",
      errors: validationResult.error.issues,
    };
  }

  const validatedData = validationResult.data as ProductSchemaType;
  const imageFiles = rawData.images as ImageFile[]; // Validated File objects

  // 3. Upload Images
  const uploadedImageUrls: string[] = [];
  try {
    // Using Promise.all for concurrent uploads
    const uploadPromises = imageFiles.map((file) => uploadToPinata(file.file));
    const pinataResponses = await Promise.all(uploadPromises);
    pinataResponses.forEach((response: unknown) => {
      uploadedImageUrls.push(
        getImageUrlFromPinataResponse(response as PinataPinResponse)
      );
    });
    if (uploadedImageUrls.length !== imageFiles.length) {
      throw new Error("Some images failed to upload."); // Sanity check
    }
  } catch (error) {
    console.error("Image Upload Error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to upload images.",
      errors: null,
    };
  }

  // 4. Prepare data for Prisma
  const {
    systemRequirements_minimum_os,
    systemRequirements_minimum_processor,
    systemRequirements_minimum_memory,
    systemRequirements_minimum_graphics,
    systemRequirements_minimum_storage,
    systemRequirements_recommended_os,
    systemRequirements_recommended_processor,
    systemRequirements_recommended_memory,
    systemRequirements_recommended_graphics,
    systemRequirements_recommended_storage,
    platforms: platformNames,
    tags: tagNames,
    features: featureDescriptions,
    ...productData // Rest of the validated primitive/date fields
  } = validatedData;

  // Prepare sys req data, filtering out empty objects
  const sysReqDataToCreate = [];
  const minReq = {
    type: RequirementType.MINIMUM,
    os: systemRequirements_minimum_os || null,
    processor: systemRequirements_minimum_processor || null,
    memory: systemRequirements_minimum_memory || null,
    graphics: systemRequirements_minimum_graphics || null,
    storage: systemRequirements_minimum_storage || null,
  };
  if (
    Object.values(minReq).some(
      (v) => v !== null && v !== RequirementType.MINIMUM
    )
  ) {
    sysReqDataToCreate.push(minReq);
  }
  const recReq = {
    type: RequirementType.RECOMMENDED,
    os: systemRequirements_recommended_os || null,
    processor: systemRequirements_recommended_processor || null,
    memory: systemRequirements_recommended_memory || null,
    graphics: systemRequirements_recommended_graphics || null,
    storage: systemRequirements_recommended_storage || null,
  };
  if (
    Object.values(recReq).some(
      (v) => v !== null && v !== RequirementType.RECOMMENDED
    )
  ) {
    sysReqDataToCreate.push(recReq);
  }

  // 5. Database Operation
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        sku: productData.sku || null, // Ensure optional empty string becomes null for DB
        shortDescription: productData.shortDescription || null,
        publisher: productData.publisher || null,
        developer: productData.developer || null,
        releaseDate: productData.releaseDate || null,
        salePrice: productData.salePrice, // Already number | undefined from zod transform

        images: { create: uploadedImageUrls.map((url) => ({ url })) },
        platforms: {
          connectOrCreate: platformNames.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        // Only include tags if tagNames array exists and has items
        ...(tagNames &&
          tagNames.length > 0 && {
            tags: {
              connectOrCreate: tagNames.map((name) => ({
                where: { name },
                create: { name },
              })),
            },
          }),
        // Only include features if array exists and has non-empty items
        ...(featureDescriptions &&
          featureDescriptions.filter((d) => d.trim()).length > 0 && {
            features: {
              create: featureDescriptions
                .filter((d) => d.trim())
                .map((description) => ({ description })),
            },
          }),
        // Only include requirements if array has items
        ...(sysReqDataToCreate.length > 0 && {
          systemRequirements: { create: sysReqDataToCreate },
        }),
      },
    });

    // 6. Revalidate Cache
    revalidatePath("/admin/products"); // Admin list
    // Revalidate public paths if they exist
    revalidatePath("/games");
    revalidatePath(`/games/${newProduct.id}`); // Specific product page
    return {
      success: true,
      message: "Product added successfully!",
      productId: newProduct.id,
      errors: null,
    };
  } catch (error) {
    console.error("Database Error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors like unique constraints
      if (error.code === "P2002") {
        // Assuming 'sku' is the unique field causing the error based on schema
        const target = (error.meta?.target as string[]) || [];
        if (target.includes("sku")) {
          return {
            success: false,
            message: "SKU already exists.",
            errors: [
              {
                path: ["sku"],
                message: "This SKU is already in use.",
                code: "custom",
              },
            ],
          };
        }
      }
    }
    return {
      success: false,
      message: "Database error: Failed to save product.",
      errors: null,
    };
  }
}
