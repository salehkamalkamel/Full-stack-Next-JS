"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setQuery(search);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  const handleSearch = useCallback(
    (queryValue) => {
      const params = new URLSearchParams(searchParams.toString());
      if (queryValue) {
        params.set("search", queryValue);
      } else {
        params.delete("search");
      }
      router.push(`/admin/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const debouncedSearch = useRef(debounce(handleSearch, 300)).current;

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={handleChange}
        type="search"
        placeholder="Search products..."
        className="w-full appearance-none bg-background pl-8 shadow-none md:w-[300px] lg:w-[320px]"
      />
    </div>
  );
}

// Keep debounce function outside component
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
