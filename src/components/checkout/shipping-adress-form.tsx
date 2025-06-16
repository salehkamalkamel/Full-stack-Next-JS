"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShippingAddressFormType,
  shippingAddressSchema,
} from "@/lib/schemas/shipping-form-schema";
import { AddShippingAdressAction } from "@/actions/checkout-actions";
import { Button } from "../ui/button";
import { ShippingFormSubmitStateType } from "@/lib/types/checkout-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ShippingAddressForm({
  shippingFormState,
  changeShippingFormState,
}: {
  shippingFormState: ShippingFormSubmitStateType | null;
  changeShippingFormState: (state: ShippingFormSubmitStateType) => void;
}) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shippingAddressSchema),
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onFormSubmit = async (data: ShippingAddressFormType) => {
    try {
      const response = await AddShippingAdressAction(data);
      changeShippingFormState({
        success: true,
        message: "Address added successfully",
        data: response,
      });
      const params = new URLSearchParams(searchParams.toString());
      if (response.id) {
        params.set("addressId", response.id);
      } else {
        params.delete("addressId");
      }

      router.replace(`${pathname}?${params.toString()}`);
      console.log(response);
    } catch (error) {
      console.error(error);
      changeShippingFormState({
        success: false,
        message: "Failed to add address",
        data: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col items-start gap-2">
        {shippingFormState && (
          <div
            className={
              shippingFormState.success
                ? "w-full p-4 rounded-lg bg-green-100 text-green-500"
                : "w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm"
            }
          >
            {shippingFormState.message}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              disabled={isSubmitting}
              {...register("firstName")}
              id="firstName"
              required
            />
            {errors.firstName && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.firstName.message}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              disabled={isSubmitting}
              {...register("lastName")}
              id="lastName"
              required
            />
            {errors.lastName && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.lastName.message}
              </div>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address1">Address Line 1</Label>
            <Input
              disabled={isSubmitting}
              {...register("address1")}
              id="address1"
              required
            />
            {errors.address1 && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.address1.message}
              </div>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address2">Address Line 2 (Optional)</Label>
            <Input
              disabled={isSubmitting}
              {...register("address2")}
              id="address2"
            />
            {errors.address2 && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.address2.message}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              disabled={isSubmitting}
              {...register("city")}
              id="city"
              required
            />
            {errors.city && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.city.message}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State / Province</Label>
            <Input
              disabled={isSubmitting}
              {...register("state")}
              id="state"
              required
            />
            {errors.state && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.state.message}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              disabled={isSubmitting}
              {...register("postalCode")}
              id="postalCode"
              required
            />
            {errors.postalCode && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.postalCode.message}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select
              disabled={isSubmitting}
              {...register("country")}
              id="country"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
            {errors.country && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.country.message}
              </div>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              disabled={isSubmitting}
              {...register("phone")}
              id="phone"
              type="tel"
              required
            />
            {errors.phone && (
              <div className="w-full p-4 rounded-lg bg-red-100 text-red-600 text-sm">
                {errors.phone.message}
              </div>
            )}
          </div>
        </div>
        {!shippingFormState?.success && (
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Shipping Form"}
          </Button>
        )}
      </div>
    </form>
  );
}
