"use server";

import { auth } from "@/lib/auth";
import { signInSchema } from "@/lib/zodSchema";

export async function signInAction(prev: unknown, formData: FormData) {
  try {
    const parsedData = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsedData.success) {
      return {
        success: false,
        errorType: "validation",
        error: parsedData.error.format(),
      };
    }

    const { email, password } = parsedData.data;
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    if (!response.user) {
      return {
        success: false,
        errorType: "signin",
        error: "Sign-in failed. Please try again.",
      };
    }

    return {
      success: true,
      data: {
        user: response.user,
      },
    };
  } catch (err) {
    console.error("Unexpected error in signUpAction:", err);
    return {
      success: false,
      errorType: "server",
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
