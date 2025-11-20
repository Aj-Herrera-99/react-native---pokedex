import { useBatteryLevel } from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const batteryLevel = useBatteryLevel();

  return (
    <View style={styles.container}>
      <Text>Current Battery Level: {(batteryLevel * 100).toFixed(0)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
