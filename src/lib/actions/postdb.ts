"use server";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ICatchPokemon {
  name: string;
  id: string;
  user_id: string;
}

export const catchPokemon = async (pokemon: ICatchPokemon) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    return "error: Go to login first, to save your pokemon";
  }
  pokemon.user_id = session.user?.id;
  const { data, error } = await supabase
    .from("catched")
    .insert(pokemon)
    .select();

  if (error) return `error: ${error}`;
  revalidatePath(`/${pokemon.id}`);
  return "success";
};
