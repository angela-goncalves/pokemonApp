import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().trim(),
    password: z
      .string()
      .trim()
      .min(8, { message: "You need to enter at least 8 characters" }),
    confirm: z.string().trim(),
  })
  .refine((data) => data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/), {
    message: "Invalid email",
    path: ["email"],
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
