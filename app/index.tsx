import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
    name: string;
    image: string;
    imageBack: string;
    types: PokemonType[];
}

interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}

const colorsByType = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

export default function Index() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect(() => {
        // fetch pokemons
        fetchPokemons();
    }, []);

    async function fetchPokemons() {
        try {
            const res = await fetch(
                "https://pokeapi.co/api/v2/pokemon/?limit=10"
            );
            const data = await res.json();

            // Fetch detailed info for each Pokemon in parallel
            const detailedPokemons = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const res = await fetch(pokemon.url);
                    const details = await res.json();
                    return {
                        name: pokemon.name,
                        image: details.sprites.front_default, // main sprite
                        imageBack: details.sprites.back_default,
                        types: details.types,
                    };
                })
            );

            setPokemons(detailedPokemons);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                gap: 16,
                padding: 16,
            }}
        >
            {pokemons.map((pokemon) => (
                <Link
                    key={pokemon.name}
                    href={{
                        pathname: "/details",
                        params: {
                            name: pokemon.name,
                            // @ts-ignore
                            color: colorsByType[pokemon.types[0].type.name] + 50,
                        },
                    }}
                    style={{
                        backgroundColor:
                            // @ts-ignore
                            colorsByType[pokemon.types[0].type.name] + 50,
                        padding: 20,
                        borderRadius: 20,
                    }}
                >
                    <View
                        style={{
                            margin: 0,
                            padding: 0,
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.type}>
                            {pokemon.types[0].type.name}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={{ uri: pokemon.image }}
                                style={{ width: 150, height: 150 }}
                            />
                            <Image
                                source={{ uri: pokemon.imageBack }}
                                style={{ width: 150, height: 150 }}
                            />
                        </View>
                    </View>
                </Link>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 28,
        fontWeight: "bold",
        textTransform: "capitalize",
        // textAlign: "center",
    },
    type: {
        fontSize: 16,
        fontWeight: "semibold",
        color: "gray",
        // textAlign: "center",
    },
});
