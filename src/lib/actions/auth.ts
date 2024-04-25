"use server";
import { headers, cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { signupSchema } from "../schema";

export type FormState = {
  message: string;
};

export const signIn = async (state: FormState, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: `${error}` };
  }

  return redirect("/");
};

export const signUp = async (state: FormState, data: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const origin = headers().get("origin");

  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const confirm = data.get("confirm") as string;

  const parse = signupSchema.safeParse({
    email,
    password,
    confirm,
  });

  if (!parse.success) {
    const parsedError = parse.error.issues.map((issue) => issue.message);

    return { message: `${parsedError}` };
  } else {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return { message: `${error}` };
    }
  }

  return { message: "Check email to continue sign in process" };
};

export const signOut = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();
  return redirect("/");
};
