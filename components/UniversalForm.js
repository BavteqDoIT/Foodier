import { useNavigation, useRoute } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { Colors } from "../constants/colors";

function UniversalForm({ fields, onSubmit, submitLabel = "Submit" }) {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const navigation = useNavigation();
  const route = useRoute();

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (route.params?.scannedCode) {
      const scannedCode = route.params.scannedCode;
      setFormData((prev) => ({ ...prev, code: scannedCode }));
      navigation.setParams({ scannedCode: undefined });
    }
  }, [route.params?.scannedCode, navigation]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const missingField = fields.find(
      (f) => f.required && !formData[f.name].trim()
    );
    if (missingField) {
      Alert.alert("Missing field", `${missingField.label} is required.`);
      return;
    }
    onSubmit(formData);
  };

  const handleScan = () => {
    if (permission?.granted) {
      navigation.replace("Scanner");
    } else {
      Alert.alert(
        "No premission to camera",
        "To use the scanner, you must allow access to the camera. Please try again or open the app settings."
      );
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.row}>
            <TextInput
              placeholder={field.placeholder}
              placeholderTextColor="grey"
              style={[styles.input, field.name === "code" && { flex: 1 }]}
              value={formData[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
            />
            {field.name === "code" && (
              <View style={styles.scanButtonContainer}>
                {!permission?.granted && (
                  <Button
                    title="Request for premission"
                    onPress={requestPermission}
                  />
                )}
                {permission?.granted && (
                  <Button title="Scan" onPress={handleScan} />
                )}
              </View>
            )}
          </View>
        </View>
      ))}
      <Button title={submitLabel} onPress={handleSubmit} />
    </View>
  );
}

export default UniversalForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "white",
    marginBottom: 5,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 16,
    color: "white",
  },
  scanButtonContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
