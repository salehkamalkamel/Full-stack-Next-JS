"use client";

import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const steps = [
  { id: 1, name: "Cart", pathName: "/checkout/cart" },
  { id: 2, name: "Shipping", pathName: "/checkout/shipping" },
  { id: 3, name: "Summary", pathName: "/checkout/summary" },
];

export function CheckoutProgress() {
  const pathname = usePathname();
  const currentStep = steps.find((step) => step.pathName === pathname)?.id || 1;
  return (
    <nav aria-label="Checkout Progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "relative flex-1",
              index !== steps.length - 1 ? "pr-8" : ""
            )}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step.id < currentStep
                    ? "bg-primary text-primary-foreground"
                    : step.id === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <div
                className={cn(
                  "ml-2 text-sm font-medium",
                  step.id <= currentStep ? "text-gray-900" : "text-gray-500"
                )}
              >
                {step.name}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-0 w-full h-0.5",
                  step.id < currentStep ? "bg-primary" : "bg-gray-200"
                )}
                style={{
                  left: "calc(50% + 0.5rem)",
                  width: "calc(100% - 2rem)",
                }}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
