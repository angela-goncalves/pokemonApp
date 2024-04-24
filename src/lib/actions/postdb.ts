"use server";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

interface ICatchPokemon {
  name: string;
  id: string;
}

export const catchPokemon = async (pokemon: ICatchPokemon) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("catched")
    .insert(pokemon)
    .select();

  if (error) return `error: ${error}`;
  revalidatePath(`/${pokemon.id}`);
  return "success";
};
