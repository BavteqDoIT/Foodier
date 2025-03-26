import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

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
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/emoji.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your favourite food"
          onChangeText={foodInputHandler}
          value={enteredFoodText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#002404" />
          </View>
          <View style={styles.button}>
            <Button title="Add food" onPress={addFoodHandler} color="#249909" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default FoodInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#a3f590",
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
