"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="container flex items-center justify-center py-12 md:py-16">
      <div className="mx-auto w-full max-w-md space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-destructive">
            403 – Forbidden
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            You don&apos;t have permission to access this page.
          </p>
        </div>

        <div className="grid gap-4">
          <Button asChild className="w-full">
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Sign In with a different account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
