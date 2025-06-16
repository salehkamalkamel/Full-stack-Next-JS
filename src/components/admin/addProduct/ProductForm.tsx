"use client";

import type React from "react";

import Link from "next/link";
import { Eye, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ProductPreview } from "./product-preview";
import { SuccessDialog } from "./success-dialog";
import { useAddProductContext } from "@/contexts/AddProductContext";
import { FormTabs } from "./FormTabs";
import { ProductSidebar } from "./ProductSidebar";

export default function ProductForm() {
  const { setShowPreview, isSubmitting, handleSubmit, formResponse } =
    useAddProductContext();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-end space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Preview how the product will appear to customers
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes. Are you sure you want to discard
                    them?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Link href="/admin">Discard Changes</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Product
                </>
              )}
            </Button>
          </div>
          {!isSubmitting && formResponse?.success && (
            <div className="rounded-xl p-6 w-full bg-green-100 text-green-600 text-sm">
              {formResponse.message}
            </div>
          )}

          {!isSubmitting && formResponse?.errors && (
            <div className="rounded-xl p-6 w-full bg-red-100 text-red-600 text-sm flex flex-col gap-6 items-start">
              <h3 className="text-lg font-semibold">{`Total ${formResponse.errors.length} Errors Founded`}</h3>
              <ul className="flex flex-col items-start gap-2">
                {formResponse.errors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </ul>
            </div>
          )}

          <FormTabs />
        </form>

        <ProductSidebar />
      </div>
      <ProductPreview />
      <SuccessDialog />
    </>
  );
}
