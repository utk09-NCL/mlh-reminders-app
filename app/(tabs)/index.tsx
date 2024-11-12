// app/(tabs)/index.tsx

import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import ReminderCard from "../../components/ReminderCard";
import { useCallback, useState } from "react";
import RemindersList, { ReminderProps } from "../../components/RemindersList";
import { useFocusEffect } from "expo-router";
import { fetchReminders, saveReminders } from "../../utils/storageHelper";

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<ReminderProps[]>([]);
  const [expandedPriority, setExpandedPriority] = useState<
    "low" | "medium" | "high" | "today" | null
  >(null);

  const todayDate = new Date().toISOString().split("T")[0];

  useFocusEffect(
    useCallback(() => {
      const loadReminders = async () => {
        const storedReminders = await fetchReminders();
        setReminders(storedReminders.filter((reminder) => !reminder.completed));
      };
      loadReminders();
    }, []),
  );

  const handleCardPress = (priority: "low" | "medium" | "high" | "today") => {
    setExpandedPriority(expandedPriority === priority ? null : priority);
  };

  const filteredReminders = reminders.filter((reminder) =>
    expandedPriority === "today"
      ? reminder.date === todayDate
      : reminder.priority === expandedPriority,
  );

  const handleComplete = (id: string) => {
    Alert.alert(
      "Mark as Completed",
      "Do you want to mark this reminder as completed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const updatedReminders = reminders.map((reminder) =>
              reminder.id === id ? { ...reminder, completed: true } : reminder,
            );
            setReminders(updatedReminders.filter((reminder) => !reminder.completed));
            await saveReminders(
              await fetchReminders().then((allReminders) =>
                allReminders.map((reminder) =>
                  reminder.id === id ? { ...reminder, completed: true } : reminder,
                ),
              ),
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
            setReminders(updatedReminders);
            const allReminders = await fetchReminders();
            const newAllReminders = allReminders.filter((reminder) => reminder.id !== id);
            await saveReminders(newAllReminders);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headlineText}>All Reminders</Text>
      <View style={styles.cardContainer}>
        <ReminderCard
          id="today"
          cardTitle="Today"
          icon="calendar"
          iconBackgroundColor={theme.colors.blue100}
          numberOfReminders={reminders.filter((r) => r.date === todayDate).length}
          onPress={() => handleCardPress("today")}
        />
        {["low", "medium", "high"].map((priority) => (
          <ReminderCard
            id={priority}
            key={priority}
            onPress={() => handleCardPress(priority as "low" | "medium" | "high")}
            cardTitle={`${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
            icon={
              priority === "low"
                ? "alert-circle"
                : priority === "medium"
                  ? "alert-triangle"
                  : "alert-octagon"
            }
            iconBackgroundColor={
              priority === "low"
                ? theme.colors.green100
                : priority === "medium"
                  ? theme.colors.yellow100
                  : theme.colors.red100
            }
            numberOfReminders={reminders.filter((r) => r.priority === priority).length}
          />
        ))}
      </View>
      {expandedPriority && (
        <RemindersList
          reminders={filteredReminders}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  container: {
    backgroundColor: theme.colors.white100,
    flex: 1,
  },
  headlineText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
});
