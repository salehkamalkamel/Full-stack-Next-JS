"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useContext } from "react";

type CheckoutContextType = {
  steps: number;
  currentStep: number;
  nextPage: string | null;
  prevPage: string | null;
};
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export default function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkoutpages = ["/checkout", "/checkout/address", "/checkout/summary"];
  const pathName = usePathname();
  const steps = checkoutpages.length;
  const currentStep = checkoutpages.indexOf(pathName) + 1;
  const nextPage = checkoutpages[currentStep] || null;
  const prevPage = checkoutpages[currentStep - 2] || null;
  const checkoutContextValue = {
    steps,
    currentStep,
    nextPage,
    prevPage,
  };
  return (
    <CheckoutContext.Provider value={checkoutContextValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }
  return context;
}
