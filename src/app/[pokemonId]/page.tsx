import PokemonData from "@/components/PokemonData";
import React from "react";
import { getPokemonById, pokemonCatched } from "../../lib/actions/getdb";
import { Stack } from "@chakra-ui/react";

export default async function PokemonId({
  params,
}: {
  params: { pokemonId: string };
}) {
  const pokemon = await getPokemonById(params.pokemonId);
  const isPokemonCatched = await pokemonCatched(params.pokemonId);

  return (
    <PokemonData
      pokemon={pokemon}
      isCatched={isPokemonCatched === "true" ?? false}
    />
  );
}
