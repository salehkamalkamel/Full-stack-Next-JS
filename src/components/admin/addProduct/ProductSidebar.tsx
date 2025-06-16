"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAddProductContext } from "@/contexts/AddProductContext";

export function ProductSidebar() {
  const { formData } = useAddProductContext();

  // Check if sections are complete
  const isBasicInfoComplete = Boolean(
    formData.name && formData.category && formData.description && formData.price
  );
  const isMediaComplete = formData.images.length > 0;
  const isPlatformsComplete = formData.platforms.length > 0;
  const isPricingComplete = Boolean(formData.price);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{formData.name || "Not set"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{formData.category || "Not set"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-medium">
              {formData.price ? `$${formData.price}` : "Not set"}
              {formData.onSale && formData.salePrice && (
                <span className="text-green-600 ml-2">
                  Sale: ${formData.salePrice}
                </span>
              )}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Stock</p>
            <p className="font-medium">{formData.stock || "Not set"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Images</p>
            <p className="font-medium">{formData.images.length} uploaded</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Platforms</p>
            <div className="flex flex-wrap gap-1">
              {formData.platforms.length > 0 ? (
                formData.platforms.map((platform) => (
                  <Badge key={platform} variant="outline">
                    {platform}
                  </Badge>
                ))
              ) : (
                <p className="text-sm">None selected</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button className="w-full">Save Product</Button>
        </CardFooter>
      </Card>

      {/* Completion state section */}
      <Card>
        <CardHeader>
          <CardTitle>Completion Status</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Basic Info  */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isBasicInfoComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span>Basic Information</span>
              </div>
              <Badge variant={isBasicInfoComplete ? "default" : "outline"}>
                {isBasicInfoComplete ? "Complete" : "Incomplete"}
              </Badge>
            </div>

            {/* Media Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isMediaComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span>Media</span>
              </div>
              <Badge variant={isMediaComplete ? "default" : "outline"}>
                {isMediaComplete ? "Complete" : "Incomplete"}
              </Badge>
            </div>

            {/* Platforms Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isPlatformsComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span>Platforms</span>
              </div>
              <Badge variant={isPlatformsComplete ? "default" : "outline"}>
                {isPlatformsComplete ? "Complete" : "Incomplete"}
              </Badge>
            </div>

            {/* Pricing Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isPricingComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span>Pricing</span>
              </div>
              <Badge variant={isPricingComplete ? "default" : "outline"}>
                {isPricingComplete ? "Complete" : "Incomplete"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
