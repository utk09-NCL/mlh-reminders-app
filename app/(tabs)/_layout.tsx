// app/(tabs)/_layout.tsx

import { Link, Tabs, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../../theme";
import { Pressable, StyleSheet } from "react-native";

export default function TabsLayout() {
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
            <Link href="/addReminder" asChild>
              <Pressable hitSlop={20}>
                <Feather
                  name="plus"
                  size={24}
                  color={theme.colors.blue900}
                  style={styles.addReminder}
                />
              </Pressable>
            </Link>
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
