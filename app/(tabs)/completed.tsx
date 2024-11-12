import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { theme } from "../../theme";
import RemindersList, { ReminderProps } from "../../components/RemindersList";
import { fetchReminders, saveReminders } from "../../utils/storageHelper";

export default function CompletedReminders() {
  const [reminders, setReminders] = useState<ReminderProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadReminders = async () => {
        const storedReminders = await fetchReminders();
        setReminders(storedReminders.filter((reminder) => reminder.completed));
      };
      loadReminders();
    }, []),
  );

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
      <Text style={styles.headlineText}>Completed Reminders</Text>
      <RemindersList reminders={reminders} onDelete={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
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
