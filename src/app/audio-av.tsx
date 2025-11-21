import { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";

export default function App() {
    const [recording, setRecording] = useState<Audio.Recording | undefined>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [isRecording, setIsRecording] = useState(false);

    async function startRecording() {
        try {
            if (permissionResponse?.status !== "granted") {
                console.log("Requesting permission..");
                await requestPermission();
            }
            setRecording(undefined);
            setIsRecording(true);
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log("Starting recording..");
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log("Recording started");
        } catch (err) {
            setIsRecording(false);
            console.error("Failed to start recording", err);
        }
    }

    async function stopRecording() {
        console.log("Stopping recording..");
        setIsRecording(false);
        await recording?.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        // const uri = recording?.getURI();
        // console.log("Recording stopped and stored at", uri);
    }

    return (
        <View style={styles.container}>
            <Button
                title={isRecording ? "Stop Recording" : "Start Recording"}
                onPress={isRecording ? stopRecording : startRecording}
            />
            {!isRecording && recording && (
                <Player uri={recording?.getURI() ?? undefined} />
            )}
        </View>
    );
}

function Player({ uri }: { uri: string | undefined }) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [status, setStatus] = useState<Audio.AVPlaybackStatus | null>(null);

    async function playSound() {
        if (!uri) return;

        // Unload previous sound if any
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }

        // Load sound
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri },
            {},
            onPlaybackStatusUpdate // callback
        );

        setSound(newSound);

        // Play sound
        await newSound.playAsync();
    }

    // Gets called on every change of sound status (playing, paused, finished...)
    const onPlaybackStatusUpdate = (status: Audio.AVPlaybackStatus) => {
        setStatus(status);
    };

    useEffect(() => {
        return sound
            ? () => {
                  console.log("Unloading Sound");
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const isPlaying =
        status && "isPlaying" in status ? status.isPlaying : false;

    return (
        <View style={{ padding: 20 }}>
            <Text>Status:</Text>
            <Text>- Loaded: {sound ? "Yes" : "No"}</Text>
            <Text>- Playing: {isPlaying ? "Yes" : "No"}</Text>
            <Text>
                - Position:{" "}
                {status && "positionMillis" in status
                    ? (status.positionMillis / 1000).toFixed(0) + "s"
                    : "N/A"}
            </Text>

            <Button title="Play Sound" onPress={playSound} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        padding: 10,
    },
});
