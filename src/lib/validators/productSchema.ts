// src/lib/validators/productSchema.ts
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageFileSchema = z.object({
  id: z.number(),
  file: z.instanceof(File).refine((file) => {
    const isValidType = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE;
    return isValidType && isValidSize;
  }),
  preview: z.string(),
});

export const productSchema = z
  .object({
    // Basic Info
    name: z.string().min(3, "Product name must be at least 3 characters"),
    sku: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    shortDescription: z
      .string()
      .max(150, "Short description max 150 characters")
      .optional()
      .or(z.literal("")), // Allow empty string

    // Pricing & Inventory
    price: z.coerce.number().positive("Price must be a positive number"),
    salePrice: z
      .string()
      .optional()
      .transform((val, ctx) => {
        if (val === undefined || val === null || val.trim() === "")
          return undefined;
        const num = Number(val);
        if (isNaN(num) || num < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Sale price must be a valid positive number",
          });
          return z.NEVER;
        }
        return num;
      }),
    // FormData sends 'on' or null/undefined for checkboxes
    onSale: z.preprocess(
      (val) => val === "on" || val === "true" || val === true,
      z.boolean()
    ),
    stock: z.coerce
      .number()
      .int()
      .nonnegative("Stock must be a non-negative integer"),

    // Media (validate files received from FormData)
    images: z.array(imageFileSchema).min(1, "At least one image is required"),

    // Details
    // Use coerce.date() for date strings, or handle invalid dates
    releaseDate: z.preprocess((arg) => {
      if (!arg || typeof arg !== "string") return undefined; // Handle null or non-string input
      try {
        const date = new Date(arg);
        // Check if the date is valid - Date objects for invalid dates return NaN for getTime()
        return isNaN(date.getTime()) ? undefined : date;
      } catch {
        return undefined; // Handle potential parsing errors
      }
    }, z.date().optional()),
    publisher: z.string().optional().or(z.literal("")),
    developer: z.string().optional().or(z.literal("")),

    // Arrays sent as JSON strings from client
    platforms: z.array(z.string()).min(1, "At least one platform is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    features: z.preprocess((val) => {
      try {
        return JSON.parse(String(val));
      } catch {
        return [];
      }
    }, z.array(z.string()).optional()),

    // System Requirements (sent as individual fields)
    systemRequirements_minimum_os: z.string().optional().or(z.literal("")),
    systemRequirements_minimum_processor: z
      .string()
      .optional()
      .or(z.literal("")),
    systemRequirements_minimum_memory: z.string().optional().or(z.literal("")),
    systemRequirements_minimum_graphics: z
      .string()
      .optional()
      .or(z.literal("")),
    systemRequirements_minimum_storage: z.string().optional().or(z.literal("")),
    systemRequirements_recommended_os: z.string().optional().or(z.literal("")),
    systemRequirements_recommended_processor: z
      .string()
      .optional()
      .or(z.literal("")),
    systemRequirements_recommended_memory: z
      .string()
      .optional()
      .or(z.literal("")),
    systemRequirements_recommended_graphics: z
      .string()
      .optional()
      .or(z.literal("")),
    systemRequirements_recommended_storage: z
      .string()
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.onSale) {
        if (data.salePrice === undefined) return false; // Required if onSale
        return data.salePrice < data.price; // Must be less than price
      }
      return true;
    },
    {
      message:
        "Sale price is required when 'On Sale' and must be less than regular price",
      path: ["salePrice"],
    }
  );

export type ProductSchemaType = Omit<z.infer<typeof productSchema>, "images">;
