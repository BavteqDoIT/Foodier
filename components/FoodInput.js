import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

function FoodInput(props) {
  const [enteredFoodText, setEnteredFoodText] = useState("");

  function foodInputHandler(enteredText) {
    setEnteredFoodText(enteredText);
  }

  function addFoodHandler() {
    props.onAddFood(enteredFoodText);
    setEnteredFoodText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your favourite food"
        onChangeText={foodInputHandler}
        value={enteredFoodText}
      />
      <Button title="Add food" onPress={addFoodHandler} />
    </View>
  );
}

export default FoodInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
});
