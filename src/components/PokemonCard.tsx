"use client";
import React from "react";
import { Stack, Text, HStack, Badge, AspectRatio } from "@chakra-ui/react";
import Image from "next/image";

interface IPokemonCard {
  pokemon: any;
}

export default function PokemonCard({ pokemon }: IPokemonCard) {
  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center">
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={`${pokemon.name}'s image`}
          width={200}
          height={200}
        />
      </AspectRatio>
      <Text textAlign="center" textTransform="capitalize">
        {pokemon.name}
      </Text>
      <HStack flexDirection="row" wrap="wrap" spacing="2">
        {pokemon.types?.map((type: any) => (
          <Badge size="xs" key={type.slot} borderRadius="sm">
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
