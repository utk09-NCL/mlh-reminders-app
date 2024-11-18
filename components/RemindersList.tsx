import React, { useRef } from "react";
import { View, FlatList, Animated, StyleSheet, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { theme } from "../theme";
import { Feather } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

export type ReminderProps = {
  id: string;
  title: string;
  date: string;
  time: string;
  priority: "low" | "medium" | "high";
  completed?: boolean;
};

export type RemindersListProps = {
  reminders: ReminderProps[];
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const RemindersList: React.FC<RemindersListProps> = ({ reminders, onComplete, onDelete }) => {
  const swipeableRefs = useRef<Map<string, React.RefObject<Swipeable>>>(new Map());

  const renderLeftActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.leftAction}>
        <Animated.View style={[styles.actionContent, { transform: [{ scale }] }]}>
          <Feather name="check" size={24} color={theme.colors.white100} />
          <Text style={styles.actionText}>Complete</Text>
        </Animated.View>
      </View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightAction}>
        <Animated.View style={[styles.actionContent, { transform: [{ scale }] }]}>
          <Feather name="trash-2" size={24} color={theme.colors.white100} />
          <Text style={styles.actionText}>Delete</Text>
        </Animated.View>
      </View>
    );
  };

  const handleSwipeableOpen = (direction: "left" | "right", id: string) => {
    const swipeableRef = swipeableRefs.current.get(id);
    if (direction === "left" && onComplete) {
      onComplete(id);
    } else if (direction === "right" && onDelete) {
      onDelete(id);
    }
    swipeableRef?.current?.close();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let swipeableRef = swipeableRefs.current.get(item.id);
          if (!swipeableRef) {
            swipeableRef = React.createRef<Swipeable>();
            swipeableRefs.current.set(item.id, swipeableRef);
          }

          return (
            <Swipeable
              ref={swipeableRef}
              renderLeftActions={renderLeftActions}
              renderRightActions={renderRightActions}
              onSwipeableOpen={(direction) => handleSwipeableOpen(direction, item.id)}
            >
              <View style={styles.listParent}>
                <Text style={styles.reminderTitle}>{item.title}</Text>
                <View style={styles.listChild}>
                  <Text>
                    {format(parseISO(item.date), "MMM dd, yyyy")} | {item.time}
                  </Text>
                  <View style={styles.flexSpacer} />
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
                </View>
              </View>
            </Swipeable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionContent: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  actionText: {
    color: theme.colors.white100,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 5,
    width: "100%",
  },
  flexSpacer: {
    width: 10,
  },
  leftAction: {
    backgroundColor: theme.colors.green100,
    justifyContent: "center",
    // Ensure sufficient width
    width: 150,
  },
  listChild: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
  },
  listParent: {
    backgroundColor: theme.colors.white100,
    borderBottomColor: theme.colors.black60,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rightAction: {
    alignItems: "flex-end",
    backgroundColor: theme.colors.red100,
    justifyContent: "center",
    width: 150,
  },
});

export default RemindersList;
