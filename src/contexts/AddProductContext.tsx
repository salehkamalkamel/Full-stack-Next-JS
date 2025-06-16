// src/contexts/AddProductContext.tsx (or similar path)
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useTransition,
  useMemo,
} from "react";

import {
  AddProductContextType,
  AddProductProviderProps,
  CustomFormData,
  FormErrors,
  FormSubmitResponse,
  ImageFile,
  SystemRequirements,
} from "@/lib/types";
import { addProductAction } from "@/actions/AddProductAction";
import { useRouter } from "next/navigation";
// import { addProductAction } from "@/actions/AddProductAction";

// --- Define Initial State ---

// --- Create Context ---
// Provide default empty functions and state initially
const AddProductContext = createContext<AddProductContextType | null>(null);

// --- Create Provider Component ---
export function AddProductProvider({ children }: AddProductProviderProps) {
  const getInitialFormData = useMemo(
    () => ({
      name: "",
      sku: "",
      category: "",
      description: "",
      shortDescription: "",
      price: "",
      salePrice: "",
      onSale: false,
      stock: "",
      images: [],
      platforms: [],
      tags: [],
      releaseDate: "",
      publisher: "",
      developer: "",
      features: ["", "", ""],
      systemRequirements: {
        minimum: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
        },
        recommended: {
          os: "",
          processor: "",
          memory: "",
          graphics: "",
          storage: "",
        },
      },
    }),
    []
  );
  const [formData, setFormData] = useState<CustomFormData>(getInitialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [activeTab, setActiveTab] = useState("basic");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formResponse, setFormResponse] = useState<FormSubmitResponse | null>(
    null
  );
  const router = useRouter();
  const runOnPc = formData.platforms.includes("PC");
  // --- Handler Functions (using useCallback for stability) ---

  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormResponse(null);
      startTransition(async () => {
        const response = await addProductAction(formData);
        setFormResponse(response);
        if (response && response.success) {
          router.push("/admin/products");
        }
      });
    },
    [formData, router]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear specific error on change
      setFormErrors((prev) => {
        if (!prev[name as keyof FormErrors]) return prev;
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    },
    []
  );

  const handleCategoryChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setFormErrors((prev) => {
      if (!prev.category) return prev;
      const newErrors = { ...prev };
      delete newErrors.category;
      return newErrors;
    });
  }, []);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, onSale: checked }));
    if (!checked) {
      // Clear salePrice error if disabling
      setFormErrors((prev) => {
        if (!prev.salePrice) return prev;
        const newErrors = { ...prev };
        delete newErrors.salePrice;
        return newErrors;
      });
    }
  }, []);

  const handleSystemReqChange = useCallback(
    (
      type: "minimum" | "recommended",
      field: keyof SystemRequirements,
      value: string
    ) => {
      setFormData((prev) => ({
        ...prev,
        systemRequirements: {
          ...prev.systemRequirements,
          [type]: { ...prev.systemRequirements[type], [field]: value },
        },
      }));
    },
    []
  );

  const handleFeatureChange = useCallback((index: number, value: string) => {
    setFormData((prev) => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  }, []);

  const addFeatureField = useCallback(() => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  }, []);

  const removeFeatureField = useCallback((index: number) => {
    setFormData((prev) => {
      const newFeatures = [...prev.features];
      if (newFeatures.length > 0) newFeatures.splice(index, 1);
      return { ...prev, features: newFeatures };
    });
  }, []);

  const togglePlatform = useCallback((platform: string) => {
    setFormData((prev) => {
      const newPlatforms = prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: newPlatforms };
    });
    setFormErrors((prev) => {
      if (!prev.platforms) return prev;
      const newErrors = { ...prev };
      delete newErrors.platforms;
      return newErrors;
    });
  }, []);

  const handleTagInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value.trim();
        if (value) {
          setFormData((prev) => {
            if (!prev.tags.includes(value))
              return { ...prev, tags: [...prev.tags, value] };
            return prev;
          });
          inputElement.value = "";
        }
      }
    },
    []
  );

  const addTag = useCallback((tag: string) => {
    setFormData((prev) => {
      if (!prev.tags.includes(tag))
        return { ...prev, tags: [...prev.tags, tag] };
      return prev;
    });
  }, []);

  const removeTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        const newImages: ImageFile[] = filesArray.map((file, index) => ({
          id: Date.now() + index,
          file,
          preview: URL.createObjectURL(file),
        }));
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
        setFormErrors((prev) => {
          if (!prev.images) return prev;
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
        e.target.value = ""; // Reset file input
      }
    },
    []
  );

  const removeImage = useCallback((id: number) => {
    setFormData((prev) => {
      const imageToRemove = prev.images.find((img) => img.id === id);
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);
      return { ...prev, images: prev.images.filter((img) => img.id !== id) };
    });
  }, []);

  const resetForm = useCallback(() => {
    // Revoke existing URLs before resetting state
    formData.images.forEach((img) => URL.revokeObjectURL(img.preview));
    setFormData(getInitialFormData);
    setFormErrors({});
    // Note: Resetting activeTab or fileInput value needs to happen in the Page component
  }, [formData.images, getInitialFormData]); // Dependency needed for cleanup

  // Cleanup Object URLs on unmount or when images change significantly
  // This effect now lives within the provider that manages the images state
  useEffect(() => {
    const currentImages = formData.images;
    return () => {
      console.log("Cleaning up image previews");
      currentImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [formData.images]);

  // --- Context Value ---
  const value: AddProductContextType = useMemo(
    () => ({
      formData,
      formErrors,
      activeTab,
      showSuccessDialog,
      showPreview,
      isSubmitting,
      formResponse,
      runOnPc,
      handleSubmit,
      setShowPreview,
      setShowSuccessDialog,
      // validateForm,
      setActiveTab,
      setFormErrors,
      handleInputChange,
      handleCategoryChange,
      handleSwitchChange,
      handleSystemReqChange,
      handleFeatureChange,
      addFeatureField,
      removeFeatureField,
      togglePlatform,
      handleTagInput,
      addTag,
      removeTag,
      handleImageUpload,
      removeImage,
      resetForm,
    }),
    [
      formData,
      formErrors,
      activeTab,
      showSuccessDialog,
      showPreview,
      isSubmitting,
      formResponse,
      runOnPc,
      handleSubmit,
      setShowPreview,
      setShowSuccessDialog,
      // validateForm,
      setActiveTab,
      setFormErrors,
      handleInputChange,
      handleCategoryChange,
      handleSwitchChange,
      handleSystemReqChange,
      handleFeatureChange,
      addFeatureField,
      removeFeatureField,
      togglePlatform,
      handleTagInput,
      addTag,
      removeTag,
      handleImageUpload,
      removeImage,
      resetForm,
    ]
  );

  return (
    <AddProductContext.Provider value={value}>
      {children}
    </AddProductContext.Provider>
  );
}

// --- Create Custom Hook ---
export function useAddProductContext() {
  const context = useContext(AddProductContext);
  if (!context) {
    throw new Error(
      "useAddProductContext must be used within an AddProductProvider"
    );
  }
  return context;
}
