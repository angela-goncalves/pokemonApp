"use server";

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export const deletePokemon = async (pokemonid: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.from("catched").delete().eq("id", pokemonid);

  if (error) return `error: ${error}`;
  revalidatePath("/");

  return "success";
};
