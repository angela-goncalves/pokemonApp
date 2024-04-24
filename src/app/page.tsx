import { getPokemon } from "@/lib/actions/getdb";
import PokemonsList from "@/components/PokemonsList";

export default async function Home() {
  const pokemons = await getPokemon(0);

  if (pokemons[0]?.message) {
    <div>
      <p>Sorry, something went wrong trying to show pokemons</p>
      <p>{pokemons[0].message}</p>
    </div>;
  }

  return (
    <main>
      <PokemonsList initialPokemons={pokemons} />
    </main>
  );
}
