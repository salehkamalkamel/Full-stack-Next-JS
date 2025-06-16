import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = signUpSchema.omit({
  name: true,
});

// Assuming these are defined somewhere
// You can define them below if needed
const ImageFileSchema = z.object({
  // Add your actual fields here
  url: z.string().url(),
  name: z.string(),
});

const SystemRequirementsSchema = z.object({
  os: z.string(),
  processor: z.string(),
  memory: z.string(),
  graphics: z.string(),
  storage: z.string(),
});

export const productSchema = z.object({
  name: z.string(),
  sku: z.string(),
  category: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.string(),
  salePrice: z.string(),
  onSale: z.boolean(),
  stock: z.string(),
  images: z.array(ImageFileSchema),
  platforms: z.array(z.string()),
  tags: z.array(z.string()),
  releaseDate: z.string(),
  publisher: z.string(),
  developer: z.string(),
  features: z.array(z.string()),
  systemRequirements: z
    .object({
      minimum: SystemRequirementsSchema,
      recommended: SystemRequirementsSchema,
    })
    .optional(),
});
