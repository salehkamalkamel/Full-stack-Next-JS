import { ShippingTabsSkeleton } from "@/components/checkout/ShippingTabs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ShippingForm = dynamic(
  () => import("@/components/checkout/shipping-form")
);

export default async function ShippingPage() {
  return (
    <Suspense fallback={<ShippingTabsSkeleton />}>
      <ShippingForm />
    </Suspense>
  );
}
