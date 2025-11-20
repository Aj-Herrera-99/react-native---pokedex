import { useEffect } from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import {
    useAudioRecorder,
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorderState,
    useAudioPlayer,
    useAudioPlayerStatus,
} from "expo-audio";

export default function Audio() {
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const recorderState = useAudioRecorderState(audioRecorder);
    console.log(audioRecorder.uri);
    // let player = useAudioPlayer(audioRecorder.uri);

    const record = async () => {
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
    };

    const stopRecording = async () => {
        // The recording will be available on `audioRecorder.uri`.
        await audioRecorder.stop();
        console.log(audioRecorder.uri);
    };

    useEffect(() => {
        (async () => {
            const status = await AudioModule.requestRecordingPermissionsAsync();
            if (!status.granted) {
                Alert.alert("Permission to access microphone was denied");
            }

            setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentMode: true,
                allowsRecording: true,
                shouldPlayInBackground: false,
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                title={
                    recorderState.isRecording
                        ? "Stop Recording"
                        : "Start Recording"
                }
                onPress={recorderState.isRecording ? stopRecording : record}
            />
            {audioRecorder.uri &&
                audioRecorder.uri.length &&
                !audioRecorder.isRecording && (
                    // <View>
                    //     <Button title="Play Sound" onPress={() => player.play()} />
                    //     <Button
                    //         title="Replay Sound"
                    //         onPress={() => {
                    //             player.seekTo(0);
                    //             player.play();
                    //         }}
                    //     />
                    // </View>
                    <Player uri={audioRecorder.uri} />
                )}
        </View>
    );
}

function Player({ uri }: { uri: string }) {
    const player = useAudioPlayer({ uri });
    const status = useAudioPlayerStatus(player);

    return (
        <View>
            <Text>Playing: {status.playing ? "Yes" : "No"}</Text>
            <Text>Position: {Math.round(status.currentTime)}s</Text>
            <Button
                title="Play"
                onPress={() => {
                    player.play();
                }}
            />
            <Button
                title="Pause"
                onPress={() => {
                    player.pause();
                }}
            />
            <Button
                title="Seek to start"
                onPress={() => {
                    player.seekTo(0);
                }}
            />
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
