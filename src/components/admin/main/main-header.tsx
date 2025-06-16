"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState("7d");

  const options = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 3 months", value: "3m" },
    { label: "Last year", value: "1y" },
  ];

  useEffect(() => {
    const current = searchParams.get("from");
    if (current) setSelected(current);
  }, [searchParams]);

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("from", value);
    router.push(`/admin?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
      <div className="flex items-center gap-2">
        <select
          value={selected}
          onChange={handleFilterChange}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {options.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
