import { Stack } from "expo-router";
import "../global.css"

export default function RootLayout() {
    return (
        <Stack>
            {/* stack screen mi permette di modificare la top bar di ogni "pagina" */}
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    title: "Details",
                    // headerBackButtonDisplayMode: "minimal",
                }}
            />
        </Stack>
    );
}
