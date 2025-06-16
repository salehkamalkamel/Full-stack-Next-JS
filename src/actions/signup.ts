"use server";

import { auth } from "@/lib/auth";
import { signUpSchema } from "@/lib/zodSchema";

export async function signUpAction(prev: unknown, formData: FormData) {
  try {
    // Step 1: Validate data with Zod
    const parsed = signUpSchema.safeParse({
      name: `${formData.get("first-name")} ${formData.get("last-name")}`,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      return {
        success: false,
        errorType: "validation",
        error: parsed.error.format(),
      };
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const { name, email, password } = parsed.data;

    // Step 2: Attempt to sign up via Better Auth
    const response = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!response.user) {
      return {
        success: false,
        errorType: "signup",
        error: "Sign-up failed. Please try again.",
      };
    }

    if (email === adminEmail) {
    }

    // Step 3: Return success
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
