import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

type Params = {
    name?: string;
    color?: string;
};

export default function Details() {
    const params = useLocalSearchParams<Params>();

    const name = params.name ?? "No name";
    const color = params.color ?? "#ffffff";

    return (
        <View
            // style={{
            //     alignItems: "center",
            //     justifyContent: "center",
            //     height: "100%",
            //     backgroundColor: "red",
            // }}
            style={{ backgroundColor: color }}
            className="grow justify-center items-center"
        >
            <Link href="/buttons">
                <Text className="text-5xl font-bold uppercase p-2">{name}</Text>
            </Link>
        </View>
    );
}
