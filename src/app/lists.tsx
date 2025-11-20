import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

interface Pokemon {
    name: string;
    url: string;
}

export default function Lists() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const list = [
        "home",
        "profile",
        "dashboard",
        "settings",
        "notifications",
        "messages",
        "contacts",
        "calendar",
        "tasks",
        "projects",
        "analytics",
        "reports",
        "search",
        "favorites",
        "help",
        "about",
        "terms",
        "privacy",
        "login",
        "register",
        "reset-password",
        "billing",
        "subscriptions",
        "support",
        "faq",
        "chat",
        "gallery",
        "blog",
        "events",
        "feedback",
    ];

    useEffect(() => {
        fetchPokemons();
        async function fetchPokemons() {
            try {
                const res = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
                );
                const data = await res.json();
                // console.log(JSON.stringify(data.results));
                setPokemons(data.results);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text className="text-5xl font-bold uppercase p-2">Flat list</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={pokemons}
                    renderItem={({ item }) => <Item name={item.name} />}
                    keyExtractor={(pokemon) => pokemon.name}
                />
            </View>

            <Text className="text-5xl font-bold uppercase p-2">
                Scroll view
            </Text>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {list.map((item) => (
                        <Item key={item} name={item} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const Item = ({ name }: { name: string }) => {
    return (
        <View className="items-center border rounded-md p-6 my-2">
            <Text>{name}</Text>
        </View>
    );
};
