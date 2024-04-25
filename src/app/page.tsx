import { getPokemon } from "@/lib/actions/getdb";
import PokemonsList from "@/components/PokemonsList";
import { Stack } from "@chakra-ui/react";

export default async function Home() {
  const pokemons = await getPokemon(0);

  if (pokemons[0]?.message) {
    <div>
      <p>Sorry, something went wrong trying to show pokemons</p>
      <p>{pokemons[0].message}</p>
    </div>;
  }

  return (
    <Stack w="100%" direction={"row"} justifyContent={"center"}>
      <PokemonsList initialPokemons={pokemons} />
    </Stack>
  );
}
