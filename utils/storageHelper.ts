import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/constants";
import { ReminderProps } from "../components/RemindersList";

export const addReminder = async (newReminder: ReminderProps) => {
  const reminders = await fetchReminders();
  reminders.push(newReminder);
  await saveReminders(reminders);
};

export const fetchReminders = async (): Promise<ReminderProps[]> => {
  try {
    const storedReminders = await AsyncStorage.getItem(STORAGE_KEY);
    return storedReminders ? JSON.parse(storedReminders) : [];
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }
};

export const saveReminders = async (reminders: ReminderProps[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch (error) {
    console.error("Error saving reminders:", error);
  }
};
