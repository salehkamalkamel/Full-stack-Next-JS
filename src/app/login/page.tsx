"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/auth/SignUpForm";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="container flex items-center justify-center py-12 md:py-16 mx-auto border md:border-0 mt-6 rounded-lg w-72 sm:w-96 md:w-auto">
      <div className="mx-auto w-full max-w-md space-y-6 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to GameVault
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to your account or create a new one
          </p>
        </div>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <LoginForm />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Apple
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <SignUpForm />
            <div className="text-center text-sm">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-primary underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
