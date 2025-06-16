"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type NavErrorType = {
  message: string;
};

export default function CheckoutFlowCtrl() {
  const [navError, setNavError] = useState<NavErrorType | null>(null);
  const pathName = usePathname();
  const checkoutpages = [
    "/checkout",
    "/checkout/shipping",
    "/checkout/summary",
  ];
  const nextPage = checkoutpages[checkoutpages.indexOf(pathName) + 1] || null;
  const prevPage = checkoutpages[checkoutpages.indexOf(pathName) - 1] || null;

  // switch (pathName) {
  //   case "/checkout":
  //     if (!canGoNext) {
  //       setNavError({ message: "Please fill in all required fields." });
  //     } else {
  //       setNavError(null);
  //     }
  //     break;
  //   case "/checkout/shipping":
  //     if (!canGoNext) {
  //       setNavError({ message: "Please fill in all required fields." });
  //     } else {
  //       setNavError(null);
  //     }
  //     break;
  //   case "/checkout/summary":
  //     if (!canGoNext) {
  //       setNavError({ message: "Please fill in all required fields." });
  //     } else {
  //       setNavError(null);
  //     }
  //     break;
  //   default:
  //     break;
  // }

  if (!checkoutpages.includes(pathName)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full py-6">
      <div className="w-full flex justify-between items-center">
        {prevPage && (
          <Button
            asChild
            onClick={() => {
              if (navError) {
                setNavError(null);
              }
            }}
            variant="secondary"
            className="w-fit"
          >
            <Link href={prevPage}>Prev Step</Link>
          </Button>
        )}

        {nextPage && (
          <Button
            asChild
            className="w-fit"
            onClick={() => {
              if (navError) {
                setNavError(null);
              }
            }}
          >
            <Link href={nextPage}>Next Step</Link>
          </Button>
        )}
      </div>
      {navError?.message && (
        <p className="text-start text-lg text-red-600">{navError?.message}</p>
      )}
    </div>
  );
}
