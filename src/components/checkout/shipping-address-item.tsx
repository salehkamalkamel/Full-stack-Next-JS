import { Address } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { Building, Check, Edit, Home, MapPin } from "lucide-react";
import { Button } from "../ui/button";

export default function AddressItem({
  address,
  selectedSavedAddressId,
  handleSelectSavedAddress,
  handleEditAddress,
}: {
  address: Address;
  selectedSavedAddressId: string | null;
  handleSelectSavedAddress: (addressId: string) => void;
  handleEditAddress: () => void;
}) {
  const getAddressTypeIcon = (type: string | undefined) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4 mr-2" />;
      case "work":
        return <Building className="h-4 w-4 mr-2" />;
      default:
        return <MapPin className="h-4 w-4 mr-2" />;
    }
  };
  return (
    <Card
      key={address.id}
      className={`cursor-pointer transition-all ${
        selectedSavedAddressId === address.id
          ? "border-primary ring-1 ring-primary"
          : "hover:border-gray-400"
      }`}
      onClick={() => handleSelectSavedAddress(address.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {getAddressTypeIcon(address.type || undefined)}
            <span className="font-medium capitalize">
              {address.type || "Address"}
            </span>
          </div>
          {address.isDefault && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address1}</p>
          {address.address2 && <p>{address.address2}</p>}
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p>{address.country}</p>
          <p className="mt-1">{address.phone}</p>
        </div>

        {selectedSavedAddressId === address.id && (
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center text-primary">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Selected</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={(e) => {
                e.stopPropagation();
                handleEditAddress();
              }}
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
