"use client";

import type React from "react";

import { Plus, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAddProductContext } from "@/contexts/AddProductContext";

// Platforms for the checkboxes
const platforms = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X/S",
  "Xbox One",
  "Nintendo Switch",
  "Mac",
];

// Tags for suggestions
const suggestedTags = [
  "Multiplayer",
  "Single Player",
  "Co-op",
  "Open World",
  "First Person",
  "Third Person",
  "VR",
  "Indie",
  "Early Access",
  "Free to Play",
];

export function ProductDetailsForm() {
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleFeatureChange,
    removeFeatureField,
    togglePlatform,
    addFeatureField,
    addTag,
    removeTag,
  } = useAddProductContext();

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !formData.tags.includes(value)) {
        addTag(value);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Add detailed information about your product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="releaseDate">Release Date</Label>
            <Input
              disabled={isSubmitting}
              id="releaseDate"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="developer">Developer</Label>
            <Input
              disabled={isSubmitting}
              id="developer"
              name="developer"
              placeholder="Game developer"
              value={formData.developer}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            disabled={isSubmitting}
            id="publisher"
            name="publisher"
            placeholder="Game publisher"
            value={formData.publisher}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Platforms <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <input
                  disabled={isSubmitting}
                  type="checkbox"
                  id={`platform-${platform}`}
                  checked={formData.platforms.includes(platform)}
                  onChange={() => togglePlatform(platform)}
                  name="platforms"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor={`platform-${platform}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </div>
          {formErrors.platforms && (
            <p className="text-sm text-red-500">{formErrors.platforms}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeTag(tag)}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove {tag}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <Input
            disabled={isSubmitting}
            type="text"
            name="tags"
            placeholder="Add tags (press Enter or comma to add)"
            onKeyDown={(e) => handleTagInput(e)}
          />
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">
              Suggested tags:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags
                .filter((tag) => !formData.tags.includes(tag))
                .slice(0, 6)
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => addTag(tag)}
                  >
                    + {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Key Features</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeatureField}
              className="h-8"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Feature
            </Button>
          </div>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                disabled={isSubmitting}
                type="text"
                name={`feature-${index}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="flex-1"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeatureField(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove feature</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
