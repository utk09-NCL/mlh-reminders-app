// app/(tabs)/index.tsx

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { REMINDERS_CARD_DATA } from "../../constants/data";
import ReminderCard from "../../components/ReminderCard";

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headlineText}>All Reminders</Text>
      <View style={styles.cardContainer}>
        {REMINDERS_CARD_DATA.map((cardData) => (
          <ReminderCard
            key={cardData.cardTitle}
            cardTitle={cardData.cardTitle}
            icon={cardData.icon}
            numberOfReminders={cardData.numberOfReminders}
            iconBackgroundColor={cardData.iconBackgroundColor}
          />
        ))}
      </View>
      <StatusBar style="auto" />
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
