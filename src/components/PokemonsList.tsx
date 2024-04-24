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

interface IHomePage {
  initialPokemons: any[];
}

const PokemonsList = ({ initialPokemons }: IHomePage) => {
  const [offset, setOffset] = useState<number>(20);
  const [pokemons, setPokemonList] = useState<any[]>(initialPokemons);

  const loadMorePokemons = async () => {
    const apiPokemons = await getPokemon(offset);
    await setPokemonList((prev) => [...prev, ...apiPokemons]);
    setOffset(offset + 20);
  };

  return (
    <Flex alignItems="center" minH="100vh" justifyContent="center" pt="10">
      <Container maxW="container.lg">
        <Stack p="5" alignItems="center" spacing="5">
          <SimpleGrid spacing="5" columns={{ base: 1, sm: 3, lg: 5 }}>
            {pokemons?.map((pokemon) => (
              <Link
                href={`/${pokemon.id}`}
                key={pokemon.id}
                bg="green.50"
                border="none"
                borderRadius="lg">
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </SimpleGrid>
          <Button
            onClick={loadMorePokemons}
            bg="transparent"
            color="gray.50"
            textDecoration={"underline"}>
            Cargar más
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
};
export default PokemonsList;
