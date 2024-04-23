import PokemonData from "@/components/PokemonData";
import React from "react";
import { getPokemonById } from "../actions/getdb";

export default async function PokemonId({
  params,
}: {
  params: { pokemonId: string };
}) {
  const pokemon = await getPokemonById(params.pokemonId);

  return (
    <div>
      <PokemonData pokemon={pokemon} />
    </div>
  );
}
