import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { format, parseISO } from "date-fns";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../theme";

export type Priority = "low" | "medium" | "high";

export type ReminderProps = {
  id: string;
  title: string;
  date: string;
  time: string;
  priority: Priority;
  completed?: boolean;
};

export type RemindersListProps = {
  reminders: ReminderProps[];
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const RemindersList: React.FC<RemindersListProps> = ({ reminders, onComplete, onDelete }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listParent}>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <View style={styles.listChild}>
              <Text>
                {format(parseISO(item.date), "MMM dd, yyyy")} | {item.time}
              </Text>
              <View style={styles.flexSpacer} />
              <View style={styles.actionIcons}>
                <Feather
                  name={
                    item.priority === "low"
                      ? "alert-circle"
                      : item.priority === "medium"
                        ? "alert-triangle"
                        : "alert-octagon"
                  }
                  size={24}
                  color={
                    item.priority === "low"
                      ? theme.colors.green100
                      : item.priority === "medium"
                        ? theme.colors.yellow100
                        : theme.colors.red100
                  }
                />
                <View style={styles.flexSpacer} />
                <TouchableOpacity
                  onPress={() => {
                    if (onComplete && !item.completed) {
                      onComplete(item.id);
                    }
                  }}
                >
                  <Feather
                    name={item.completed ? "check" : "circle"}
                    size={24}
                    color={item.completed ? theme.colors.green100 : theme.colors.black60}
                  />
                </TouchableOpacity>
                <View style={styles.flexSpacer} />
                <TouchableOpacity onPress={() => onDelete?.(item.id)}>
                  <Feather name="trash-2" size={24} color={theme.colors.red100} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default RemindersList;

const styles = StyleSheet.create({
  actionIcons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 5,
    width: "100%",
  },
  flexSpacer: {
    width: 10,
  },
  listChild: {
    alignItems: "center",
    borderBottomColor: theme.colors.black60,
    flexDirection: "row",
    paddingTop: 10,
  },
  listParent: {
    borderBottomColor: theme.colors.black60,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
