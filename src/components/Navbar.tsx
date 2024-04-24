"use client";
import React from "react";
import {
  Container,
  Stack,
  SimpleGrid,
  Flex,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
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

export default function Navbar({ pokemons }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const handleDelete = async (id: string) => {
    await deletePokemon(id);
  };

  return (
    <Stack>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        py="6"
        px="20"
        alignItems={"center"}>
        <Link href="/" style={{ fontWeight: 800, color: "#FEEBC8" }}>
          Pokemon-test
        </Link>
        <Button ref={btnRef} bg="orange.200" onClick={onOpen}>
          Mis pokemones
        </Button>
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
            {pokemons?.map((pokemon: any, index: number) => (
              <Stack direction={"column"} key={pokemon.id} pb="8">
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
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
