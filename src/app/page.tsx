import { getPokemon } from "@/lib/actions/getdb";
import PokemonsList from "@/components/PokemonsList";

export default async function Home() {
  const pokemons = await getPokemon(0);

  return (
    <main>
      <PokemonsList initialPokemons={pokemons} />
    </main>
  );
}
