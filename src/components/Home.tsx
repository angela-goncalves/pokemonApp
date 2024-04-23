"use client";
import React from "react";
import {
  Container,
  Stack,
  SimpleGrid,
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";

interface IHomePage {
  pokemons: any[];
  page: string;
}

interface IHomePage {
  pokemons: any[];
  page: string;
}

const HomePage: React.FC<IHomePage> = ({ pokemons, page }) => {
  return (
    <div>
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <Stack p="5" alignItems="center" spacing="5">
            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {pokemons.map((pokemon) => (
                <Link href={`/${pokemon.id}`} key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} />
                </Link>
              ))}
            </SimpleGrid>
            <Link href={`/?page=${page ? Number(page) + 1 : 1}`}>
              Cargar más
            </Link>
          </Stack>
        </Container>
      </Flex>
    </div>
  );
};
export default HomePage;
