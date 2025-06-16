// import type React from "react";

import { getAllShippingAddressesAction } from "@/actions/shipping-adress-actions";
import ShippingTabs from "./ShippingTabs";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import ShippingAdressForm from "./shipping-adress-form";
// import { useCheckout } from "@/contexts/checkout-context";
// import { ShippingMethodType } from "@/lib/types/checkout-types";
// import { mockShippingMethods } from "@/lib/shipping-form-data";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { useEffect, useState, useTransition } from "react";
// import SavedShippingAddresses from "./saved-shipping-addresses";
// import { Address } from "@prisma/client";
// import { getAllShippingAddressesAction } from "@/actions/shipping-adress-actions";

// export function ShippingForm() {
//   const {
//     handleChangeShippingMethod,
//     shippingFormState,
//     shippingMethod,
//     prevStep,
//     nextStep,
//   } = useCheckout();
//   const [addressFormMode, setAddressFormMode] = useState<
//     "new" | "edit" | "hidden"
//   >("hidden");
//   const [shippingAddress, setShippingAddress] = useState<Address[] | null>(
//     null
//   );
//   const [isPending, startTransition] = useTransition();

//   function handleAddressFormMode(mode: "new" | "edit" | "hidden") {
//     setAddressFormMode(mode);
//   }

//   const handleShippingMethodChange = (value: ShippingMethodType) => {
//     handleChangeShippingMethod(value);
//   };

//   useEffect(() => {
//     async function fetchShippingAddresses() {
//       startTransition(async () => {
//         const response = await getAllShippingAddressesAction();
//         if (response) {
//           setShippingAddress(response);
//         } else {
//           setShippingAddress([]);
//         }
//       });
//     }

//     fetchShippingAddresses();
//   }, []);

//   return (
//     <div>
//       <div className="space-y-8">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//         </div>
//         {/* Shipping Address */}
//         <div className="mb-6">
//           <Tabs defaultValue="saved" className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-4">
//               <TabsTrigger value="saved">Saved Addresses</TabsTrigger>
//               <TabsTrigger value="new">New Address</TabsTrigger>
//             </TabsList>
//             <TabsContent value="saved">
//               {isPending && (
//                 <div className="w-full p-4 rounded-lg bg-yellow-100 text-yellow-500">
//                   Loading saved addresses...
//                 </div>
//               )}
//               {shippingAddress && shippingAddress.length === 0 && (
//                 <SavedShippingAddresses
//                   savedAddresses={shippingAddress}
//                   handleAddressFormMode={handleAddressFormMode}
//                 />
//               )}
//             </TabsContent>
//             <TabsContent value="new">
//               <ShippingAdressForm />
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Shipping Method */}
//         {shippingFormState?.success && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
//             <RadioGroup
//               defaultValue={"standard"}
//               onValueChange={(value) =>
//                 handleShippingMethodChange(
//                   mockShippingMethods.find(
//                     (item) => item.name === value
//                   ) as ShippingMethodType
//                 )
//               }
//             >
//               {mockShippingMethods.map((method) => (
//                 <div
//                   key={method.id}
//                   className="flex items-center space-x-2 border rounded-md p-4 mb-2"
//                 >
//                   <RadioGroupItem value={method.name} id={method.id} />
//                   <div className="flex flex-1 justify-between items-center">
//                     <Label
//                       htmlFor={method.id}
//                       className="flex-1 cursor-pointer"
//                     >
//                       <div className="font-medium">{method.name}</div>
//                       <div className="text-sm text-gray-500">
//                         {method.estimatedDelivery}
//                       </div>
//                     </Label>
//                     <div className="font-medium">
//                       ${method.price.toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//         )}

//         {/* Navigation buttons */}
//         <div className="flex justify-between pt-4">
//           <Button type="button" variant="outline" onClick={prevStep}>
//             Back to Cart
//           </Button>
//           {shippingFormState?.success && shippingMethod && (
//             <Button onClick={nextStep} type="submit">
//               Continue to Payment
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default async function ShippingForm() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const savedAddresses = await getAllShippingAddressesAction();
  const cartItems = (await prisma.cartItem.count()) || 0;

  if (cartItems === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some items to your cart to continue checkout.
        </p>
        <Button asChild>
          <Link href="/games">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <ShippingTabs savedAddresses={savedAddresses} />
    </div>
  );
}
