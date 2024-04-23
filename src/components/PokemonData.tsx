"use client";
import React from "react";
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  Badge,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { catchedPokemon } from "@/app/actions/postdb";
import axios from "axios";

interface IPokemonData {
  pokemon: any;
}

export default function PokemonData({ pokemon }: IPokemonData) {
  // const [state, formAction] = useFormState(catchedPokemon, { message: "" });
  // console.log("state", state);
  const handleChange = async () => {
    return fetch("/api/catched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: pokemon.id,
        name: pokemon.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data to post", data);
      })
      .catch((error) => {
        console.error("Error posting data", error);
      });
  };

  return (
    <div>
      <Stack spacing="5" pb="5">
        <Stack spacing="5" position="relative">
          <Box position="absolute" right="0" zIndex="99">
            {/* <form action={formAction}> */}
            <Checkbox name="chatch" onChange={handleChange}>
              Catched
            </Checkbox>
            {/* </form> */}
          </Box>
          <AspectRatio w="full" ratio={1}>
            <Image
              width={100}
              height={100}
              style={{ width: "150px", height: "auto" }}
              // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
              alt={`${pokemon.name}'s image`}
            />
          </AspectRatio>
          <Stack direction="row" spacing="5">
            <Stack>
              <Text fontSize="sm">Weight</Text>
              <Text>20</Text>
            </Stack>
            <Stack>
              <Text fontSize="sm">Height</Text>
              <Text>12</Text>
            </Stack>
            <Stack>
              <Text fontSize="sm">Movimientos</Text>
              <Text>109</Text>
            </Stack>
            <Stack>
              <Text fontSize="sm">Tipos</Text>
              <HStack>
                <Badge>Agua</Badge>
                <Badge>Agua</Badge>
              </HStack>
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
          <Stack>
            <Text fontSize="xs">hp</Text>
            <Progress bg="gray.300" borderRadius="full" value={80} />
          </Stack>
          <Stack>
            <Text fontSize="xs">attack</Text>
            <Progress bg="gray.300" borderRadius="full" value={65} />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
