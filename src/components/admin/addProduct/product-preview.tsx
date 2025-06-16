"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAddProductContext } from "@/contexts/AddProductContext";

export function ProductPreview() {
  const { formData, showPreview, setShowPreview } = useAddProductContext();

  return (
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Product Preview</DialogTitle>
          <DialogDescription>
            Preview how your product will appear to customers
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-6 -mr-6">
          <div className="space-y-6">
            {/* Preview Header */}
            <div className="relative aspect-video overflow-hidden rounded-lg border">
              {formData.images.length > 0 ? (
                <Image
                  src={formData.images[0].preview || "/placeholder.svg"}
                  alt={formData.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <p className="text-muted-foreground">No image uploaded</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <Badge className="mb-2">
                  {formData.category || "Category"}
                </Badge>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {formData.name || "Product Name"}
                </h1>
                <p className="text-white/80 max-w-xl">
                  {formData.shortDescription ||
                    formData.description.substring(0, 150) ||
                    "Product description..."}
                </p>
              </div>
            </div>

            {/* Preview Content */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <div className="space-y-6">
                {/* Image Gallery */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.slice(0, 4).map((image, index) => (
                      <div
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-md border"
                      >
                        <Image
                          src={image.preview || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="prose max-w-none">
                  <h2>Description</h2>
                  <p>{formData.description || "No description provided."}</p>
                </div>

                {/* Features */}
                {formData.features.some((f) => f.trim() !== "") && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                    <ul className="space-y-2">
                      {formData.features
                        .filter((f) => f.trim() !== "")
                        .map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* System Requirements */}
                {(formData.systemRequirements.minimum.os ||
                  formData.systemRequirements.recommended.os) && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      System Requirements
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {formData.systemRequirements.minimum.os && (
                        <div>
                          <h3 className="text-lg font-medium mb-2">Minimum</h3>
                          <div className="space-y-2">
                            {formData.systemRequirements.minimum.os && (
                              <div>
                                <p className="font-medium">OS</p>
                                <p className="text-muted-foreground">
                                  {formData.systemRequirements.minimum.os}
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.minimum.processor && (
                              <div>
                                <p className="font-medium">Processor</p>
                                <p className="text-muted-foreground">
                                  {
                                    formData.systemRequirements.minimum
                                      .processor
                                  }
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.minimum.memory && (
                              <div>
                                <p className="font-medium">Memory</p>
                                <p className="text-muted-foreground">
                                  {formData.systemRequirements.minimum.memory}
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.minimum.graphics && (
                              <div>
                                <p className="font-medium">Graphics</p>
                                <p className="text-muted-foreground">
                                  {formData.systemRequirements.minimum.graphics}
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.minimum.storage && (
                              <div>
                                <p className="font-medium">Storage</p>
                                <p className="text-muted-foreground">
                                  {formData.systemRequirements.minimum.storage}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.systemRequirements.recommended.os && (
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Recommended
                          </h3>
                          <div className="space-y-2">
                            {formData.systemRequirements.recommended.os && (
                              <div>
                                <p className="font-medium">OS</p>
                                <p className="text-muted-foreground">
                                  {formData.systemRequirements.recommended.os}
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.recommended
                              .processor && (
                              <div>
                                <p className="font-medium">Processor</p>
                                <p className="text-muted-foreground">
                                  {
                                    formData.systemRequirements.recommended
                                      .processor
                                  }
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.recommended.memory && (
                              <div>
                                <p className="font-medium">Memory</p>
                                <p className="text-muted-foreground">
                                  {
                                    formData.systemRequirements.recommended
                                      .memory
                                  }
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.recommended
                              .graphics && (
                              <div>
                                <p className="font-medium">Graphics</p>
                                <p className="text-muted-foreground">
                                  {
                                    formData.systemRequirements.recommended
                                      .graphics
                                  }
                                </p>
                              </div>
                            )}
                            {formData.systemRequirements.recommended
                              .storage && (
                              <div>
                                <p className="font-medium">Storage</p>
                                <p className="text-muted-foreground">
                                  {
                                    formData.systemRequirements.recommended
                                      .storage
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Pricing Card */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <div>
                          {formData.onSale && formData.salePrice ? (
                            <div className="text-right">
                              <span className="text-xl font-bold">
                                ${formData.salePrice}
                              </span>
                              <span className="text-muted-foreground line-through ml-2">
                                ${formData.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold">
                              ${formData.price || "0.00"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Availability:
                        </span>
                        <Badge
                          variant={
                            Number(formData.stock) > 0
                              ? "default"
                              : "destructive"
                          }
                        >
                          {Number(formData.stock) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Badge>
                      </div>

                      <Button className="w-full">Add to Cart</Button>
                      <Button variant="outline" className="w-full">
                        Add to Wishlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Details Card */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {formData.developer && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Developer:
                        </span>
                        <span>{formData.developer}</span>
                      </div>
                    )}

                    {formData.publisher && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Publisher:
                        </span>
                        <span>{formData.publisher}</span>
                      </div>
                    )}

                    {formData.releaseDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Release Date:
                        </span>
                        <span>
                          {new Date(formData.releaseDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {formData.platforms.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">
                          Platforms:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.platforms.map((platform) => (
                            <Badge key={platform} variant="outline">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.tags.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
