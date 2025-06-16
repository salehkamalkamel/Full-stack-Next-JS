"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { signInAction } from "@/actions/signin";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(signInAction, null);

  useEffect(() => {
    if (state?.success) {
      redirect("/");
    }
  }, [state?.success]);

  return (
    <form action={action} className="space-y-4">
      {!state?.success && state?.error && (
        <div className="rounded-lg bg-red-100 text-red-500 text-sm p-6 space-y-1">
          {typeof state.error === "string" ? (
            <p>{state.error}</p>
          ) : (
            Object.entries(state.error).map(([field, value]) => (
              <p key={field}>
                {field}: {"_errors" in value ? value._errors.join(", ") : ""}
              </p>
            ))
          )}
        </div>
      )}

      {state?.success && (
        <div className="rounded-lg bg-green-100 text-green-500 text-sm p-6 space-y-1">
          <p>Logged In successfully!</p>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          disabled={isPending}
          name="email"
          id="email"
          type="email"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            disabled={isPending}
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
          />
          <Button
            disabled={isPending}
            aria-label={showPassword ? "Hide password" : "Show password"}
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full">
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
