"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAddProductContext } from "@/contexts/AddProductContext";

export function SystemRequirementsForm() {
  const { formData, isSubmitting, handleSystemReqChange } =
    useAddProductContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Requirements</CardTitle>
        <CardDescription>
          Specify the minimum and recommended system requirements for your game.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Minimum Requirements</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-os">Operating System</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="min-os"
                  placeholder="e.g., Windows 10 64-bit"
                  value={formData.systemRequirements.minimum.os}
                  onChange={(e) =>
                    handleSystemReqChange("minimum", "os", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-processor">Processor</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="min-processor"
                  placeholder="e.g., Intel Core i5-8400"
                  value={formData.systemRequirements.minimum.processor}
                  onChange={(e) =>
                    handleSystemReqChange(
                      "minimum",
                      "processor",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-memory">Memory</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="min-memory"
                  placeholder="e.g., 8 GB RAM"
                  value={formData.systemRequirements.minimum.memory}
                  onChange={(e) =>
                    handleSystemReqChange("minimum", "memory", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-graphics">Graphics</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="min-graphics"
                  placeholder="e.g., NVIDIA GeForce GTX 1060"
                  value={formData.systemRequirements.minimum.graphics}
                  onChange={(e) =>
                    handleSystemReqChange("minimum", "graphics", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-storage">Storage</Label>
              <Input
                required
                disabled={isSubmitting}
                id="min-storage"
                placeholder="e.g., 50 GB available space"
                value={formData.systemRequirements.minimum.storage}
                onChange={(e) =>
                  handleSystemReqChange("minimum", "storage", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Recommended Requirements</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rec-os">Operating System</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="rec-os"
                  placeholder="e.g., Windows 10/11 64-bit"
                  value={formData.systemRequirements.recommended.os}
                  onChange={(e) =>
                    handleSystemReqChange("recommended", "os", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rec-processor">Processor</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="rec-processor"
                  placeholder="e.g., Intel Core i7-10700K"
                  value={formData.systemRequirements.recommended.processor}
                  onChange={(e) =>
                    handleSystemReqChange(
                      "recommended",
                      "processor",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rec-memory">Memory</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="rec-memory"
                  placeholder="e.g., 16 GB RAM"
                  value={formData.systemRequirements.recommended.memory}
                  onChange={(e) =>
                    handleSystemReqChange(
                      "recommended",
                      "memory",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rec-graphics">Graphics</Label>
                <Input
                  required
                  disabled={isSubmitting}
                  id="rec-graphics"
                  placeholder="e.g., NVIDIA GeForce RTX 3070"
                  value={formData.systemRequirements.recommended.graphics}
                  onChange={(e) =>
                    handleSystemReqChange(
                      "recommended",
                      "graphics",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rec-storage">Storage</Label>
              <Input
                required
                disabled={isSubmitting}
                id="rec-storage"
                placeholder="e.g., 50 GB SSD"
                value={formData.systemRequirements.recommended.storage}
                onChange={(e) =>
                  handleSystemReqChange(
                    "recommended",
                    "storage",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
