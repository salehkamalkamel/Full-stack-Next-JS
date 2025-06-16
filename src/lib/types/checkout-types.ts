export type CheckoutContextType = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  selectedSavedAddressId: string | null;
  setSelectedSavedAddressId: (id: string | null) => void;
  termsAccepted: boolean;
  marketingOptIn: boolean;
  shippingMethod: ShippingMethodType | null;
  handleTermAccepted: (state: boolean) => void;
  handleMarketingOptIn: (state: boolean) => void;
  shippingFormState: ShippingFormSubmitStateType | null;
  handleChangeShippingMethod: (method: ShippingMethodType) => void;
  changeShippingFormState: (newState: ShippingFormSubmitStateType) => void;
};

export type ShippingFormSubmitStateType = {
  success: boolean;
  message: string;
  data: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    id: string;
  } | null;
};

export type CheckoutContextValueType = {
  step: number;
  selectedSavedAddressId: string | null;
  setSelectedSavedAddressId: (id: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  termsAccepted: boolean;
  marketingOptIn: boolean;
  shippingMethod: ShippingMethodType | null;
  handleTermAccepted: (state: boolean) => void;
  handleMarketingOptIn: (state: boolean) => void;
  shippingFormState: ShippingFormSubmitStateType | null;
  handleChangeShippingMethod: (method: ShippingMethodType) => void;
  changeShippingFormState: (newState: ShippingFormSubmitStateType) => void;
};

export type ShippingMethodType = {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
  deleveryNumberOfDays: number;
};

export type submitOrderState = {
  success: boolean;
  message: string;
};
