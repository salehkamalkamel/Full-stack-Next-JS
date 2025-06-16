"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDetailes } from "@/lib/types/product-type";

// Dynamically import tab contents to improve initial load time
const AboutTab = dynamic(() => import("./tabs/about-tab"));
const FeaturesTab = dynamic(() => import("./tabs/features-tab"));
const SystemRequirementsTab = dynamic(
  () => import("./tabs/system-requirements-tab")
);
// const ReviewsTab = dynamic(() => import("./tabs/reviews-tab"));

export default function GameDetailsTabs({ game }: { game: ProductDetailes }) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Tabs
      defaultValue="about"
      value={activeTab}
      onValueChange={setActiveTab}
      className="mt-8"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="about">About</TabsTrigger>
        {game.features.length > 0 && (
          <TabsTrigger value="features">Features</TabsTrigger>
        )}
        {game.systemRequirements.length > 0 && (
          <TabsTrigger value="system">System Requirements</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="about" className="mt-6 space-y-6">
        <AboutTab game={game} />
      </TabsContent>

      <TabsContent value="features" className="mt-6 space-y-6">
        <FeaturesTab features={game.features} />
      </TabsContent>

      <TabsContent value="system" className="mt-6">
        {game.systemRequirements != null && (
          <SystemRequirementsTab systemRequirements={game.systemRequirements} />
        )}
      </TabsContent>
    </Tabs>
  );
}
