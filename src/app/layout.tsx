import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { pokemonbyUser } from "@/lib/actions/getdb";
import Navbar from "@/components/Navbar";

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

  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "black" }}>
        <ChakraProvider>
          <Navbar pokemons={pokemons} />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
