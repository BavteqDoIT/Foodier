import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { init, updatePlace } from "../util/database";
import Loading from "../components/Loading";
import { Colors } from "../constants/colors";

function PlaceEdit({ route, navigation }) {
  const [place, setPlace] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { placeId } = route.params;

  useEffect(() => {
    const loadData = async () => {
      const db = await init();

      const placeData = await db.getFirstAsync(
        "SELECT * FROM places WHERE id = ?;",
        [placeId]
      );

      if (!placeData) {
        Alert.alert("Error", "Place not found.");
        navigation.goBack();
        return;
      }

      setPlace(placeData);
      setName(placeData.name);
      setDescription(placeData.description || "");
    };

    loadData();
  }, [placeId]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Place name is required.");
      return;
    }

    try {
      await updatePlace(placeId, name.trim(), description.trim());
      Alert.alert("Success", "Place updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating place", error);
      Alert.alert("Error", "Failed to update place.");
    }
  };

  if (!place) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Place Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Place Name"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Edit Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor="gray"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
}

export default PlaceEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    color: "white",
    backgroundColor: Colors.gray800,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
