"use server";
import axios from "axios";

export const getPokemon = async (page: number): Promise<any[]> => {
  const offset = (page - 1) * 20;
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
    .then(async ({ data }) => {
      const promises = data.results.map((result: any) => axios(result.url));
      const fetchedPokemon = (await Promise.all(promises)).map(
        (res) => res.data
      );

      return fetchedPokemon;
    });
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
