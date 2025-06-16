"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function PromoCode() {
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoError, setPromoError] = useState("");

  const applyPromoCode = () => {
    if (!promoCode) {
      setPromoError("Please enter a promo code");
      return;
    }

    // Simulate promo code validation
    if (promoCode.toLowerCase() === "discount10") {
      // In a real app, you would dispatch an action to apply the discount
      setPromoError("");
      setShowPromoInput(false);
    } else {
      setPromoError("Invalid promo code");
    }
  };
  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        type="button"
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        onClick={() => setShowPromoInput(!showPromoInput)}
      >
        {showPromoInput ? (
          <ChevronUp className="h-4 w-4 mr-2" />
        ) : (
          <ChevronDown className="h-4 w-4 mr-2" />
        )}
        {showPromoInput ? "Hide promo code" : "Add promo code"}
      </button>

      {showPromoInput && (
        <div className="mt-2 space-y-2">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="h-9"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={applyPromoCode}
              className="whitespace-nowrap"
            >
              Apply
            </Button>
          </div>
          {promoError && <p className="text-xs text-red-600">{promoError}</p>}
        </div>
      )}
    </div>
  );
}
