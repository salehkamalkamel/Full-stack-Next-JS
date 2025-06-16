// src/components/admin/addProduct/BasicInfoTab.tsx
"use client";

import React from "react"; // No longer need specific types from constants here if using context

// Context Hook
import { useAddProductContext } from "@/contexts/AddProductContext"; // Adjust path

// UI Components (keep these)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// Constants might still be needed if passed as props (like categories)
// Or import them directly here if they are static
import { categories } from "@/lib/constants"; // Example import

// No longer need props for data/handlers if using context
// interface BasicInfoTabProps { ... }

export default function BasicInfoTab() {
  // Consume context instead of props
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleCategoryChange,
    handleSwitchChange,
  } = useAddProductContext();

  // Pass static constants like categories directly or via props if needed
  // const { categories } = props; // If passed via props still

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              disabled={isSubmitting}
              id="name"
              name="name" // name attribute is crucial for handleInputChange
              placeholder="Enter product name"
              value={formData.name} // Use context state
              onChange={(e) => handleInputChange(e)} // Use context handler
              className={formErrors.name ? "border-red-500" : ""} // Use context errors
            />
            {formErrors.name && (
              <p className="text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>

          {/* SKU and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                disabled={isSubmitting}
                id="sku"
                name="sku"
                value={formData.sku}
                placeholder="Enter SKU (optional)"
                onChange={(e) => handleInputChange(e)}
              />
              {/* No specific SKU error handling shown, add if needed */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                disabled={isSubmitting}
                name="category"
                value={formData.category}
                onValueChange={(e) => handleCategoryChange(e)}
              >
                <SelectTrigger
                  id="category"
                  className={formErrors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(
                    (
                      category // Use imported/prop categories
                    ) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {formErrors.category && (
                <p className="text-sm text-red-500">{formErrors.category}</p>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              disabled={isSubmitting}
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange(e)}
              maxLength={150}
              className="resize-none h-20"
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.shortDescription.length}/150
            </p>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Full Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              disabled={isSubmitting}
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange(e)}
              className={`min-h-[200px] ${
                formErrors.description ? "border-red-500" : ""
              }`}
            />
            {formErrors.description && (
              <p className="text-sm text-red-500">{formErrors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing & Inventory</CardTitle>{" "}
          <CardDescription>...</CardDescription>{" "}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price and Sale Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Regular Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled={isSubmitting}
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange(e)}
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && (
                <p className="text-sm text-red-500">{formErrors.price}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="salePrice">Sale Price ($)</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="onSale"
                    checked={formData.onSale}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="onSale" className="text-sm">
                    On Sale
                  </Label>
                </div>
              </div>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.salePrice}
                onChange={(e) => handleInputChange(e)}
                disabled={!formData.onSale || isSubmitting}
                className={formErrors.salePrice ? "border-red-500" : ""}
              />
              {formErrors.salePrice && (
                <p className="text-sm text-red-500">{formErrors.salePrice}</p>
              )}
            </div>
          </div>
          {/* Stock Quantity */}
          <div className="space-y-2">
            <Label htmlFor="stock">
              Stock Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              disabled={isSubmitting}
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={(e) => handleInputChange(e)}
              className={formErrors.stock ? "border-red-500" : ""}
            />
            {formErrors.stock && (
              <p className="text-sm text-red-500">{formErrors.stock}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
