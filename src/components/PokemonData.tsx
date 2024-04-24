"use client";
import React, { useState } from "react";
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Checkbox,
  Button,
  Center,
  Flex,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { catchPokemon } from "@/lib/actions/postdb";

interface IPokemonData {
  pokemon: any;
  isCatched: boolean;
}

export default function PokemonData({ pokemon, isCatched }: IPokemonData) {
  const [resSuccess, setResSuccess] = useState<string>("");

  const handleChange = async () => {
    const response = await catchPokemon({
      id: pokemon.id,
      name: pokemon.name,
    });
    await setResSuccess(response);
  };

  return (
    <Center
      w="100vw"
      h="100%"
      overflowY="scroll"
      padding={{ base: "12px", sm: "20px", md: "40px" }}>
      <Flex
        w="100%"
        h="100%"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        paddingTop={{ base: "20px" }}>
        {resSuccess === "success" && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Your pokemon was catched!</AlertTitle>
          </Alert>
        )}
        {resSuccess.includes("error") && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>
              Sorry, something went wrong trying to catch the pokemon.
            </AlertTitle>
            <AlertDescription>
              Please, refresh the page and try again
            </AlertDescription>
          </Alert>
        )}
        <Text
          fontSize="3xl"
          pb="10"
          textTransform="capitalize"
          color="gray.100">
          {pokemon.name}
        </Text>
        <Stack
          direction={["column-reverse", "row"]}
          spacing="8"
          alignItems="center">
          <Image
            width={100}
            height={100}
            style={{ width: "180px", height: "auto" }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
            alt={`${pokemon.name}'s image`}
          />
          <Box>
            {isCatched ? (
              <Text
                px="5"
                py="2"
                border="1px"
                borderRadius="8px"
                borderColor="orange.100"
                fontSize="md"
                fontWeight={700}
                color="gray.100">
                Is catched!
              </Text>
            ) : (
              <Button name="chatch" onClick={handleChange}>
                Catch
              </Button>
            )}
          </Box>
        </Stack>
        <Stack
          w="full"
          spacing="5"
          pt="6"
          maxWidth={{ base: "100%", lg: "50%" }}>
          <Stack spacing="5" p="5" maxWidth={{ base: "max-content" }}>
            <Stack direction={["column", "row"]} spacing="5">
              <Stack direction="column">
                <Text
                  px="2"
                  borderBottom="1px"
                  borderBottomColor="orange.100"
                  fontSize="md"
                  fontWeight={700}
                  color="gray.100">
                  Peso
                </Text>
                <Text color="gray.100">{pokemon.weight} lb</Text>
              </Stack>
              <Stack direction="column">
                <Text
                  px="2"
                  borderBottom="1px"
                  borderBottomColor="orange.100"
                  fontSize="md"
                  fontWeight={700}
                  color="gray.100">
                  Altura
                </Text>
                <Text color="gray.100">{pokemon.height} ft</Text>
              </Stack>
              <Stack direction="column">
                <Text
                  px="2"
                  borderBottom="1px"
                  borderBottomColor="orange.100"
                  fontSize="md"
                  fontWeight={700}
                  color="gray.100">
                  Movimientos
                </Text>
                <Text color="gray.100">{pokemon.moves.length}</Text>
              </Stack>
              <Stack direction="column">
                <Text
                  px="2"
                  borderBottom="1px"
                  borderBottomColor="orange.100"
                  fontSize="md"
                  fontWeight={700}
                  color="gray.100">
                  Experiencia
                </Text>
                <Text color="gray.100">{pokemon.base_experience}</Text>
              </Stack>
            </Stack>
            <Stack>
              <Text
                px="2"
                borderBottom="1px"
                borderBottomColor="orange.100"
                fontSize="md"
                fontWeight={700}
                color="gray.100">
                Tipos
              </Text>
              <HStack flexDirection="row" wrap="wrap" spacing="2">
                {pokemon.types.map((item: any, index: number) => (
                  <Text
                    key={`${item.type.name}${index}`}
                    textTransform="capitalize"
                    color="gray.100">
                    {item.type.name}
                  </Text>
                ))}
              </HStack>
            </Stack>
          </Stack>

          {pokemon.stats.map((item: any, index: number) => (
            <Stack
              key={index}
              spacing="5"
              p="5"
              bg="gray.100"
              borderRadius="xl">
              <Stack w="100%">
                <Text fontSize="xs" textTransform="capitalize">
                  {item.stat.name}
                </Text>
                <Progress
                  bg="gray.300"
                  borderRadius="full"
                  value={item.base_stat}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Flex>
    </Center>
  );
}
