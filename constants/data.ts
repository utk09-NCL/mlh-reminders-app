import { ReminderCardProps } from "../components/ReminderCard";
import { theme } from "../theme";

export const REMINDERS_CARD_DATA = [
  {
    cardTitle: "Today",
    numberOfReminders: 2,
    icon: "calendar",
    iconBackgroundColor: theme.colors.blue100,
  },
  {
    cardTitle: "Low Priority",
    numberOfReminders: 4,
    icon: "alert-circle",
    iconBackgroundColor: theme.colors.green100,
  },
  {
    cardTitle: "Medium Priority",
    numberOfReminders: 0,
    icon: "alert-triangle",
    iconBackgroundColor: theme.colors.yellow100,
  },
  {
    cardTitle: "High Priority",
    numberOfReminders: 3,
    icon: "alert-octagon",
    iconBackgroundColor: theme.colors.red100,
  },
] satisfies ReminderCardProps[];
