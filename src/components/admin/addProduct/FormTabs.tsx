"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddProductContext } from "@/contexts/AddProductContext";
import BasicInfoTab from "./BasicInfoTab";
import { MediaUploadForm } from "./MediaUploadForm";
import { ProductDetailsForm } from "./ProductDetailsForm";
import { SystemRequirementsForm } from "./SystemRequirementsForm";
import { Button } from "@/components/ui/button";

export function FormTabs() {
  const { activeTab, setActiveTab, runOnPc } = useAddProductContext();

  const allTabs = runOnPc
    ? ["basic", "media", "details", "requirements"]
    : ["basic", "media", "details"];

  const currentTab = allTabs.indexOf(activeTab);
  const isLastTab = currentTab === allTabs.length - 1;
  const nextTab = currentTab + 1;

  function handleNext() {
    if (!isLastTab) {
      setActiveTab(allTabs[nextTab]);
    }
  }
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList
        className={`grid  mb-6 ${runOnPc ? "grid-cols-4" : "grid-cols-3"}`}
      >
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        {runOnPc && (
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="basic" className="space-y-6">
        <BasicInfoTab />
      </TabsContent>

      <TabsContent value="media" className="space-y-6">
        <MediaUploadForm />
      </TabsContent>

      <TabsContent value="details" className="space-y-6">
        <ProductDetailsForm />
      </TabsContent>

      {runOnPc && (
        <TabsContent value="requirements" className="space-y-6">
          <SystemRequirementsForm />
        </TabsContent>
      )}
      <Button type="button" disabled={isLastTab} onClick={handleNext}>
        Next
      </Button>
    </Tabs>
  );
}
