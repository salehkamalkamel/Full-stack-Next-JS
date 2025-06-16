"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/lib/helpers";

export function OrderFilters() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setDateFrom(undefined);
    setDateTo(undefined);
    // clear all search params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    params.delete("status");
    params.delete("dateFrom");
    params.delete("dateTo");
    const newURL = `${pathName}?${params.toString()}`;
    router.replace(newURL, {
      scroll: false,
    });
  };

  function handleSearchParamsChange(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    const newURL = `${pathName}?${params.toString()}`;
    router.replace(newURL, {
      scroll: false,
    });
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    value = value.trim();
    debounce(() => {
      setSearch(value);
      handleSearchParamsChange("query", value);
    }, 300)();
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    handleSearchParamsChange("status", value === "all" ? "" : value);
  }

  function handleDateFromChange(value: Date | undefined) {
    if (value) {
      setDateFrom(value);
      handleSearchParamsChange("dateFrom", value.toString());
    } else {
      setDateFrom(undefined);
      handleSearchParamsChange("dateFrom", "");
    }
  }

  function handleDateToChange(value: Date | undefined) {
    if (value) {
      setDateTo(value);
      handleSearchParamsChange("dateTo", value.toString());
    } else {
      setDateTo(undefined);
      handleSearchParamsChange("dateTo", "");
    }
  }
  const hasActiveFilters = status || dateFrom || dateTo;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            onChange={(e) => handleQueryChange(e)}
          />
          {search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-9 w-9 rounded-l-none p-0"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            {/* <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem> */}
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            {/* <SelectItem value="refunded">Refunded</SelectItem> */}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal sm:w-[240px]",
                !dateFrom && !dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom && dateTo ? (
                <>
                  {format(dateFrom, "LLL dd, y")} -{" "}
                  {format(dateTo, "LLL dd, y")}
                </>
              ) : (
                <span>Date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateFrom}
              selected={{
                from: dateFrom,
                to: dateTo,
              }}
              onSelect={(range) => {
                handleDateFromChange(range?.from);
                handleDateToChange(range?.to);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Active filters:
            {status && <span className="ml-1">Status: {status}</span>}
            {dateFrom && dateTo && (
              <span className="ml-1">
                Date: {format(dateFrom, "LLL dd, y")} -{" "}
                {format(dateTo, "LLL dd, y")}
              </span>
            )}
            {search && (
              <span className="ml-1">Search: &quot;{search}&quot;</span>
            )}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-7 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
