import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { useRouter } from "expo-router";
import { useState } from "react";

export type Priority = "low" | "medium" | "high";

export default function AddReminder() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("low");

  const handleSave = () => {
    if (!title) {
      console.error("Please add reminder title");
    } else {
      console.log({ title, priority });
      router.back();
    }
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
    padding: 20,
    width: "100%",
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
