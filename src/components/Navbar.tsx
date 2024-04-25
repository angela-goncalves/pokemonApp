"use client";
import React from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { deletePokemon } from "@/lib/actions/delete";
import Image from "next/image";
import Link from "next/link";
import image from "/public/ball.png";

export default function Navbar({ pokemons, user }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const handleDelete = async (id: string) => {
    await deletePokemon(id);
  };

  return (
    <Stack>
      <Flex
        direction={["column", "row"]}
        justifyContent={"space-between"}
        py="6"
        px="20"
        alignItems={"center"}>
        <Link href="/" style={{ fontWeight: 800, color: "#FEEBC8" }}>
          Pokedex
        </Link>
        {user ? (
          <Button ref={btnRef} bg="orange.200" onClick={onOpen} py="6" px="2">
            <Image
              src={image}
              alt="pokeball to see catched pokemons"
              width={40}
              height={40}
            />
          </Button>
        ) : (
          <Stack direction={"row"} color="white" alignItems={"center"}>
            <Link
              href="/login"
              style={{
                border: "1px solid white",
                padding: "8px",
                borderRadius: "8px",
              }}>
              Login
            </Link>
            <Link
              href="signup"
              style={{
                border: "none",
                padding: "8px",
                borderRadius: "8px",
                background: "white",
                color: "black",
              }}>
              Signup
            </Link>
          </Stack>
        )}
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Mis pokemones</DrawerHeader>

          <DrawerBody>
            {pokemons.length === 0 ? (
              <></>
            ) : (
              pokemons?.map((pokemon: any, index: number) => (
                <Stack direction={"column"} key={pokemon.id + index} pb="8">
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack>
                      <Image
                        width={100}
                        height={100}
                        style={{ width: "180px", height: "auto" }}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                        alt={`${pokemon.name}'s image`}
                      />
                      <Text>{pokemon.name}</Text>
                    </Stack>
                    <Button
                      onClick={() => handleDelete(pokemon.id)}
                      alignSelf={"end"}>
                      x
                    </Button>
                  </Stack>
                  <Divider />
                </Stack>
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
