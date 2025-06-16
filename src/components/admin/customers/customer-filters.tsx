"use client";

import { useState } from "react";
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
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { debounce } from "@/lib/helpers";

export function CustomerFilters() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [joinDate, setJoinDate] = useState<Date | undefined>();

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const resetFilters = () => {
    setSearch("");
    setRole("");
    setStatus("");
    params.delete("query");
    params.delete("role");
    params.delete("status");
    params.delete("joinDate");
    const newURL = `${pathName}?${params.toString()}`;
    router.replace(newURL, {
      scroll: false,
    });
    setJoinDate(undefined);
  };

  function handleSearchParamsChange(name: string, value: string) {
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

  const hasActiveFilters = search || role || status || joinDate;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              debounce(() => {
                handleSearchParamsChange("query", e.target.value);
              }, 300)();
              setSearch(e.target.value);
            }}
          />
          {search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-9 w-9 rounded-l-none p-0"
              onClick={() => {
                handleSearchParamsChange("query", "");
                setSearch("");
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Select
          value={role}
          onValueChange={(e) => {
            handleSearchParamsChange("role", e);
            setRole(e);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(e) => {
            handleSearchParamsChange("status", e);
            setStatus(e);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal sm:w-[200px]",
                !joinDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {joinDate ? format(joinDate, "PPP") : "Join date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={joinDate}
              onSelect={(date) => {
                handleSearchParamsChange("joinDate", date?.toString() || "");
                setJoinDate(date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Active filters:
            {role && <span className="ml-1">Role: {role}</span>}
            {status && <span className="ml-1">Status: {status}</span>}
            {joinDate && (
              <span className="ml-1">Join date: {format(joinDate, "PPP")}</span>
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
