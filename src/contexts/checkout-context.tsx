"use client";
import {
  CheckoutContextType,
  CheckoutContextValueType,
  ShippingFormSubmitStateType,
  ShippingMethodType,
} from "@/lib/types/checkout-types";
import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export default function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  const [shippingFormState, setShippingFormState] =
    useState<ShippingFormSubmitStateType | null>(null);
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethodType | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<
    string | null
  >(null);

  function handleTermAccepted(state: boolean) {
    setTermsAccepted(state);
  }

  function handleMarketingOptIn(state: boolean) {
    setMarketingOptIn(state);
  }
  function handleChangeShippingMethod(method: ShippingMethodType) {
    setShippingMethod(method);
  }
  function changeShippingFormState(newState: ShippingFormSubmitStateType) {
    setShippingFormState(newState);
  }
  function nextStep() {
    // Validate current step before advancing
    if (step === 1) {
      // Step 1: No specific validation (e.g., assume cart is checked elsewhere)
      setStep(2);
      return { success: true };
    } else if (step === 2) {
      // Step 2: Require shipping form data and shipping method
      if (!shippingFormState?.data) {
        return {
          success: false,
          message: "Please complete the shipping form.",
        };
      }
      if (!shippingMethod) {
        return {
          success: false,
          message: "Please select a shipping method.",
        };
      }
      setStep(3);
      return { success: true };
    } else {
      // Already at max step (3)
      return { success: false, message: "No further steps available." };
    }
  }
  function prevStep() {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  }
  const contextValue: CheckoutContextValueType = {
    step,
    termsAccepted,
    marketingOptIn,
    shippingMethod,
    shippingFormState,
    selectedSavedAddressId,
    nextStep,
    prevStep,
    handleTermAccepted,
    handleMarketingOptIn,
    changeShippingFormState,
    setSelectedSavedAddressId,
    handleChangeShippingMethod,
  };
  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckoutContext must be used inside CheckoutContext Provider"
    );
  }
  return context;
}
