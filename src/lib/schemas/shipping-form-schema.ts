import { z } from "zod";

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.enum(["US", "CA", "UK", "AU"], {
    errorMap: () => ({ message: "Please select a valid country" }),
  }),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number must be a valid format (e.g., +1234567890)"
    ),
});

export type ShippingAddressFormType = z.infer<typeof shippingAddressSchema>;
