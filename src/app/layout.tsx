import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { pokemonbyUser } from "@/lib/actions/getdb";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon App - AngelaG",
  description: "Catch your favorite pokemons",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pokemons = await pokemonbyUser();
  if (!pokemons) {
    <div>{pokemons?.[0]}</div>;
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#E53E3E" }}>
        <ChakraProvider>
          <Navbar
            pokemons={pokemons || []}
            user={user === null ? null : user}
          />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
