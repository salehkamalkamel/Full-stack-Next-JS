"use client";

import type React from "react";

import { useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAddProductContext } from "@/contexts/AddProductContext";

export function MediaUploadForm() {
  const { formData, formErrors, isSubmitting, removeImage, handleImageUpload } =
    useAddProductContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Upload high-quality images of your product. The first image will be
          used as the main product image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
            formErrors.images ? "border-red-500" : "border-muted-foreground/25"
          }`}
          onClick={triggerFileInput}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={isSubmitting}
            onChange={(e) => handleFileChange(e)}
            name="images"
          />
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">
            Drag and drop or click to upload
          </h3>
          <p className="text-sm text-muted-foreground">
            PNG, JPG or WEBP (max. 5MB each)
          </p>
        </div>
        {formErrors.images && (
          <p className="text-sm text-red-500">{formErrors.images}</p>
        )}

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {formData.images.map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image
                    src={image.preview || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  type="button"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove image</span>
                </Button>
                {index === 0 && (
                  <Badge className="absolute bottom-2 left-2">Main Image</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
