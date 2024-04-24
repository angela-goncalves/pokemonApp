"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export const getPokemon = async (offset: number): Promise<any[]> => {
  try {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
      .then(async ({ data }) => {
        const promises = data.results.map((result: any) => axios(result.url));
        const fetchedPokemon = (await Promise.all(promises)).map(
          (res) => res.data
        );

        return fetchedPokemon;
      });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getPokemonById = async (pokemonId: string) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const pokemonCatched = async (pokemonid: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("catched")
    .select()
    .eq("id", pokemonid)
    .single();

  if (error) return `error: ${error}`;
  return data.name ? "true" : "false";
};

export const pokemonbyUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("catched").select();

  if (error) return { error: `${error}` };
  return data;
};
