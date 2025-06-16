import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Check, Home, Building, MapPin } from "lucide-react";
import { Address } from "@prisma/client";
import { useCheckout } from "@/contexts/checkout-context";

export default function SavedShippingAddresses({
  savedAddresses,
  handleAddressFormMode,
}: {
  savedAddresses: Address[];
  handleAddressFormMode: (mode: "new" | "edit" | "hidden") => void;
}) {
  const { setSelectedSavedAddressId, selectedSavedAddressId } = useCheckout();

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {savedAddresses.map((address) => (
        <Card
          key={address.id}
          className={`cursor-pointer transition-all ${
            selectedSavedAddressId === address.id
              ? "border-primary ring-1 ring-primary"
              : "hover:border-gray-400"
          }`}
          onClick={() => setSelectedSavedAddressId(address.id)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                {getAddressTypeIcon(address.type ?? undefined)}
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
                    handleAddressFormMode("edit");
                  }}
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Card
        className="cursor-pointer border-dashed hover:border-gray-400 flex items-center justify-center"
        onClick={() => handleAddressFormMode("new")}
      >
        <CardContent className="p-4 text-center">
          <PlusCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="font-medium">Add New Address</p>
        </CardContent>
      </Card>
    </div>
  );
}
