import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Reminders App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.white100,
    flex: 1,
    justifyContent: "center",
  },
});
