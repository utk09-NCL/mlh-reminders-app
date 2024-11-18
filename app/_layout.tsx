// app/_layout.tsx

import { Stack, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerShadowVisible: true }} />
        <Stack.Screen
          name="addReminder"
          options={{
            title: "Add New Reminder",
            presentation: "modal",
            headerLeft: () => (
              <Feather
                name="chevrons-left"
                size={24}
                color={theme.colors.blue900}
                onPress={() => router.back()}
              />
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
