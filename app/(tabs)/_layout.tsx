// app/(tabs)/_layout.tsx

import { Tabs, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../../theme";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green100,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
          headerRight: () => (
            <Feather
              name="plus"
              size={24}
              color={theme.colors.blue900}
              style={styles.addReminder}
              onPress={() => router.push("addReminder")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed Reminders",
          tabBarIcon: ({ color }) => <Feather name="check-square" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addReminder: {
    marginRight: 20,
  },
});
