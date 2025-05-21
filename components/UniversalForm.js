import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";

function UniversalForm({ fields, onSubmit, submitLabel = "Submit" }) {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

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

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            placeholder={field.placeholder}
            placeholderTextColor="grey"
            style={styles.input}
            value={formData[field.name]}
            onChangeText={(text) => handleChange(field.name, text)}
          />
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
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "white",
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 16,
    color: "white",
  },
});
