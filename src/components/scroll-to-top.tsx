"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Button
      onClick={handleScrollToTop}
      className={`w-8 h-8 rounded-full fixed cursor-pointer bottom-4 right-4 ${
        isVisible ? "fixed" : "hidden"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp color="white" />
    </Button>
  );
}
