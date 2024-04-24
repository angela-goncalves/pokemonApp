import PokemonData from "@/components/PokemonData";
import React from "react";
import { getPokemonById, pokemonCatched } from "../../lib/actions/getdb";
import { Stack, Text } from "@chakra-ui/react";

export default async function PokemonId({
  params,
}: {
  params: { pokemonId: string };
}) {
  const pokemon = await getPokemonById(params.pokemonId);
  const isPokemonCatched = await pokemonCatched(params.pokemonId);

  if (!pokemon || isPokemonCatched?.includes("error")) {
    <div>
      <Text color="red.200">{`Sorry, something went wrong trying to show the ${params.pokemonId} pokemon`}</Text>
      <p>{isPokemonCatched ?? ""}</p>
    </div>;
  }

  return (
    <PokemonData
      pokemon={pokemon}
      isCatched={isPokemonCatched === "true" ?? false}
    />
  );
}
