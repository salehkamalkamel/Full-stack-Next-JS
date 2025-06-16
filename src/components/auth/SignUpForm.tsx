"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { signUpAction } from "@/actions/signup";
import { redirect } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signUpAction, null);
  useEffect(() => {
    if (state?.success) {
      redirect("/");
    }
  }, [state?.success]);
  return (
    <form className="space-y-4" action={formAction}>
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
          <p>Account created successfully!</p>
        </div>
      )}

      <div className="grid gap-4 grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            disabled={isPending}
            id="first-name"
            name="first-name"
            type="text"
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            disabled={isPending}
            id="last-name"
            name="last-name"
            type="text"
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-register">Email</Label>
        <Input
          disabled={isPending}
          id="email-register"
          type="email"
          name="email"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-register">Password</Label>
        <div className="relative">
          <Input
            disabled={isPending}
            id="password-register"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
          />
          <Button
            disabled={isPending}
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

      {/* Add Confirm password functionality latter */}

      {/* <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div> */}
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
