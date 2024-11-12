import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export type Priority = "low" | "medium" | "high";

export type Reminder = {
  id: string;
  title: string;
  date: string;
  time: string;
  priority: Priority;
  completed?: boolean;
};

export default function AddReminder() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [priority, setPriority] = useState<Priority>("low");

  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    setDate(selectedTime);
    setShowTimePicker(false);
  };

  const handleSave = () => {
    if (!title) {
      Alert.alert("Validation Error", "Please provide a title for the reminder");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      date: date.toISOString().split("T")[0],
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      priority,
      completed: false,
    };

    console.log(newReminder);
  };
  const handleClose = () => {
    console.log("Closed!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headlineText}>New Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Add your reminder here"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.leftAlignedText}>Select Date: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.leftAlignedText}>
          Select Time: {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        textColor="black"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />

      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        textColor="black"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(false)}
      />

      <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Priority:</Text>
        {["low", "medium", "high"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.radioOption,
              level === "low"
                ? styles.buttonGreen
                : level === "medium"
                  ? styles.buttonYellow
                  : styles.buttonRed,
              priority === level && styles.buttonSelectedPriority,
            ]}
            onPress={() => setPriority(level as Priority)}
          >
            <Text style={styles.radioText}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGreen: {
    backgroundColor: theme.colors.green100,
  },
  buttonRed: {
    backgroundColor: theme.colors.red100,
  },
  buttonSelectedPriority: {
    borderColor: theme.colors.white50,
    borderWidth: 4,
  },
  buttonText: {
    color: theme.colors.white100,
    textTransform: "uppercase",
  },
  buttonYellow: {
    backgroundColor: theme.colors.yellow100,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: theme.colors.red100,
    borderRadius: 4,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.white100,
    flex: 1,
    padding: 20,
  },
  datePickerButton: {
    alignItems: "flex-start",
    backgroundColor: theme.colors.white95,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  headlineText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    backgroundColor: theme.colors.white90,
    borderColor: theme.colors.black90,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 14,
    padding: 20,
    width: "100%",
  },
  leftAlignedText: {
    color: theme.colors.black50,
    fontSize: 16,
  },
  radioGroup: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    width: "100%",
  },
  radioLabel: {
    color: theme.colors.black90,
    fontSize: 16,
    marginRight: 10,
  },
  radioOption: {
    alignItems: "center",
    borderRadius: 6,
    flexDirection: "row",
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  radioText: {
    color: theme.colors.white100,
    fontSize: 16,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: theme.colors.blue100,
    borderRadius: 4,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
});
