import {
    Button,
    Text,
    View,
    Alert,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";

export default function Buttons() {
    const onPress = () => {
        // console.log("You tapped the button!");
        Alert.alert("You tapped the button!");
    };
    const onLongPress = () => {
        // console.log("You long-pressed!");
        Alert.alert("You long-pressed!");
    };
    return (
        <View style={styles.container}>
            <Text>Button</Text>
            <Button onPress={onPress} title="Button"></Button>

            <Text>Touchable highlight</Text>
            <TouchableHighlight
                onPress={onPress}
                underlayColor="#0C7CD5"
                style={styles.button}
            >
                <View>
                    <Text style={styles.buttonText}>Ciao</Text>
                </View>
            </TouchableHighlight>

            <Text>Touchable opacity</Text>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <View>
                    <Text style={styles.buttonText}>Ciao</Text>
                </View>
            </TouchableOpacity>

            <Text>Touchable without feedback</Text>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Ciao</Text>
                </View>
            </TouchableWithoutFeedback>

            <Text>Touchable with Long Press</Text>
            <TouchableHighlight
                onPress={onPress}
                onLongPress={onLongPress}
                underlayColor="#0C7CD5"
                style={styles.button}
            >
                <View>
                    <Text style={styles.buttonText}>Ciao</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        alignItems: "center",
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: "center",
        backgroundColor: "#2196F3",
    },
    buttonText: {
        textAlign: "center",
        padding: 20,
        color: "white",
    },
});
