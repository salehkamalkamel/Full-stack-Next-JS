"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Address } from "@prisma/client";
import SavedAddresses from "./saved-addresses";
import ShippingAddressForm from "./shipping-adress-form";
import { ShippingFormSubmitStateType } from "@/lib/types/checkout-types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function ShippingTabs({
  savedAddresses,
}: {
  savedAddresses: Address[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tabValue, setTabValue] = useState("saved");
  const [shippingFormState, setShippingFormState] =
    useState<ShippingFormSubmitStateType | null>(null);
  function changeShippingFormState(newState: ShippingFormSubmitStateType) {
    setShippingFormState(newState);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="saved">Saved Addresses</TabsTrigger>
          <TabsTrigger value="new">New Address</TabsTrigger>
        </TabsList>

        <TabsContent value="saved">
          <SavedAddresses
            savedAddresses={savedAddresses}
            onAddNewClick={() => setTabValue("new")}
          />
        </TabsContent>

        <TabsContent value="new">
          <ShippingAddressForm
            shippingFormState={shippingFormState}
            changeShippingFormState={changeShippingFormState}
          />
        </TabsContent>
      </Tabs>
      {searchParams.get("addressId") && (
        <Button
          className="w-full"
          onClick={() => {
            const params = searchParams.toString();
            router.push(`/checkout/summary${params ? "?" + params : ""}`);
          }}
        >
          Continue to Summary
        </Button>
      )}
    </div>
  );
}

export function ShippingTabsSkeleton() {
  return (
    <Tabs className="w-full" defaultValue="saved">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="saved">
          <div className="w-full h-4 bg-gray-200 animate-pulse rounded-md"></div>
        </TabsTrigger>
        <TabsTrigger value="new">
          <div className="w-full h-4 bg-gray-200 animate-pulse rounded-md"></div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="saved">
        <div className="w-full h-60 bg-gray-200 animate-pulse rounded-md"></div>
      </TabsContent>

      <TabsContent value="new">
        <div className="w-full h-60 bg-gray-200 animate-pulse rounded-md"></div>
      </TabsContent>
    </Tabs>
  );
}
