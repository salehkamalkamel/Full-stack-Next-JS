"use client";
import { Address } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import AddressItem from "./shipping-address-item";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SavedAddresses({
  savedAddresses,
  onAddNewClick,
}: {
  savedAddresses: Address[] | [];
  onAddNewClick: () => void;
}) {
  const searchParams = useSearchParams();
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<
    string | null
  >(searchParams.get("addressId") || null);
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectSavedAddress = (addressId: string) => {
    const nextSelectedId =
      selectedSavedAddressId === addressId ? null : addressId;
    setSelectedSavedAddressId(nextSelectedId);

    const params = new URLSearchParams(searchParams.toString());
    if (nextSelectedId) {
      params.set("addressId", nextSelectedId);
    } else {
      params.delete("addressId");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {savedAddresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {savedAddresses.map((address) => (
            <AddressItem
              selectedSavedAddressId={selectedSavedAddressId}
              handleSelectSavedAddress={handleSelectSavedAddress}
              handleEditAddress={onAddNewClick}
              key={address.id}
              address={address}
            />
          ))}
          <button
            className="w-full hover:scale-[0.98] transition-all ease-out duration-300 cursor-pointer"
            onClick={onAddNewClick}
          >
            <Card className="cursor-pointer border-dashed hover:border-gray-400 flex items-center justify-center">
              <CardContent className="p-4 text-center">
                <PlusCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">Add New Address</p>
              </CardContent>
            </Card>
          </button>
        </div>
      ) : (
        <button
          onClick={onAddNewClick}
          className="w-full hover:scale-[0.98] transition-all ease-out duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4 justify-center py-8 border-dashed border-2 rounded-md text-muted-foreground">
            <PlusCircle className="h-8 w-8" />
            <p className="font-medium">No saved addresses found</p>
          </div>
        </button>
      )}
    </div>
  );
}
