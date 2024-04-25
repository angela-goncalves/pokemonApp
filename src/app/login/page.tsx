"use client";

import Link from "next/link";
import { signIn } from "@/lib/actions/auth";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Stack, Text } from "@chakra-ui/react";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signIn, { message: "" });

  return (
    <Stack
      w="100%"
      minH={"100vh"}
      padding={{ base: "2", sm: "10", md: "0" }}
      justifyContent={"center"}
      alignItems={"center"}>
      <form
        action={formAction}
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "25px",
        }}>
        <Stack mb="30px">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            style={{
              height: "45px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid black",
              padding: "10px",
            }}
            placeholder="you@example.com"
          />
        </Stack>
        <Stack position="relative" marginBottom="30px">
          <label htmlFor="password" style={{ marginTop: "10px" }}>
            Password
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              required
              style={{
                height: "45px",
                width: "100%",
                border: "1px solid black",
                borderRadius: "4px",
                padding: "10px",
              }}
              placeholder="••••••••"
            />
          </label>
          <Button
            onClick={() => setViewPassword(!viewPassword)}
            type="button"
            bg="transparent"
            position="absolute"
            top="9"
            right="4">
            {viewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-off">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            )}
          </Button>
        </Stack>
        {state?.message !== "" && <Text color="red.400">{state.message}</Text>}
        <Stack w="full" my={"30px"}>
          <Button
            type="submit"
            isLoading={pending}
            width="full"
            bg="red.500"
            color="white"
            maxWidth="250px"
            alignSelf={"center"}>
            Sign in
          </Button>
        </Stack>
        <Stack
          direction={["column", "row"]}
          justifyContent={"center"}
          textDecoration={"underline"}
          mt={"20px"}>
          <h3>If you do not have an account yet,</h3>
          <Link href="/signup" style={{ textDecoration: "underline" }}>
            sign up here
          </Link>
        </Stack>
      </form>
    </Stack>
  );
}
