"use client";
import React, { useState } from "react";
import {
  Container,
  Stack,
  SimpleGrid,
  Flex,
  Link,
  Button,
} from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import { getPokemon } from "@/lib/actions/getdb";
import { pokemonTypeColors } from "@/app/utils/utils";

interface IHomePage {
  initialPokemons: any[];
}
type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

const PokemonsList = ({ initialPokemons }: IHomePage) => {
  const [offset, setOffset] = useState<number>(20);
  const [pokemons, setPokemonList] = useState<any[]>(initialPokemons);

  const loadMorePokemons = async () => {
    const apiPokemons = await getPokemon(offset);
    await setPokemonList((prev) => [...prev, ...apiPokemons]);
    setOffset(offset + 20);
  };

  const getcolor = (type: PokemonType) => {
    if (!type) {
      return "white";
    }
    return pokemonTypeColors[type];
  };

  return (
    <Flex
      alignItems="center"
      minH="100vh"
      direction={"column"}
      justifyContent="center"
      color="white">
      <Stack
        p={{ base: "2", sm: "10", md: "5" }}
        alignItems="center"
        bg="white"
        borderRadius="lg">
        <SimpleGrid spacing="1" columns={{ base: 1, sm: 2, md: 4 }}>
          {pokemons?.map((pokemon) => {
            return (
              <Link
                href={`/${pokemon.id}`}
                key={pokemon.id}
                bg={getcolor(pokemon.types[0].type.name)}
                border="none"
                minWidth={"200px"}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            );
          })}
        </SimpleGrid>
      </Stack>
      <Button
        onClick={loadMorePokemons}
        bg="transparent"
        color="gray.50"
        textDecoration={"underline"}>
        Cargar más
      </Button>
    </Flex>
  );
};
export default PokemonsList;
