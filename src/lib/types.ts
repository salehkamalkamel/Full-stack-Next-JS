import { z } from "zod";
import { signInSchema, signUpSchema } from "./zodSchema";
import { ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  regularPrice: number;
  salePrice?: number;
  productImages: ProductImage[];
  releaseDate?: Date;
  developer?: string;
  publisher?: string;
  platforms: string;
  tags: string;
  keyfeatured: string;
  price: number;

  // Minimum Requirements
  os?: string;
  processor?: string;
  memory?: string;
  graphicsCard?: string;
  storage?: string;

  // Recommended Requirements
  osRecommended?: string;
  processorRecommended?: string;
  memoryRecommended?: string;
  graphicsCardRecommended?: string;
  storageRecommended?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type resultProduct = {
  id: string;
  createdAt: string;
};

export type AddProductContextType = {
  formData: CustomFormData;
  formErrors: FormErrors;
  runOnPc: boolean;
  activeTab: string;
  showSuccessDialog: boolean;
  showPreview: boolean;
  isSubmitting: boolean;
  formResponse: FormSubmitResponse | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  // validateForm: () => boolean;
  setShowSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>; // Allow direct setting for validation
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>; // Allow direct setting for validation
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCategoryChange: (value: string) => void;
  handleSwitchChange: (checked: boolean) => void;
  handleSystemReqChange: (
    type: "minimum" | "recommended",
    field: keyof SystemRequirements,
    value: string
  ) => void;
  handleFeatureChange: (index: number, value: string) => void;
  addFeatureField: () => void;
  removeFeatureField: (index: number) => void;
  togglePlatform: (platform: string) => void;
  handleTagInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (id: number) => void;
  resetForm: () => void;
  // We keep validateForm separate or within the component that calls submit,
  // as it often depends on the *current* state snapshot during submission.
  // We also keep fileInputRef and triggerFileInput in the page component.
};

export type ImageFile = {
  id: number;
  file: File;
  preview: string;
};

export type FormSubmitResponse = {
  success: boolean;
  message?: string;
  errors?: z.ZodIssue[] | null;
  productId?: string;
};
export type SystemRequirements = {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

export type CustomFormData = {
  name: string;
  sku: string;
  category: string;
  description: string;
  shortDescription: string;
  price: string;
  salePrice: string;
  onSale: boolean;
  stock: string;
  images: ImageFile[];
  platforms: string[];
  tags: string[];
  releaseDate: string;
  publisher: string;
  developer: string;
  features: string[];
  systemRequirements: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
};

export type FormErrors = Partial<
  Record<keyof CustomFormData | "images" | "platforms", string>
>; // Allow specific error keys like 'images'

export type ProductImage = {
  id: string;
  url: string;
  altText?: string;
  productId: string;
};

export type AddProductProviderProps = {
  children: ReactNode;
};

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export type signInSchemaType = z.infer<typeof signInSchema>;
