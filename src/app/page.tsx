import styles from "./page.module.css";
import { getPokemon } from "@/app/actions/getdb";
import HomePage from "@/components/Home";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const pokemons = await getPokemon(Number(searchParams.page || "1"));

  return (
    <main className={styles.main}>
      <HomePage pokemons={pokemons} page={searchParams.page || "1"} />
    </main>
  );
}
