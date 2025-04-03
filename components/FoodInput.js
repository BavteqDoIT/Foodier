import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/emoji.png")}
          />

          <LinearGradient
            colors={["#4A00E0", "#8E2DE2"]}
            style={styles.gradientInput}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Your favourite food"
              placeholderTextColor="#eee"
              onChangeText={foodInputHandler}
              value={enteredFoodText}
            />
          </LinearGradient>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Cancel" onPress={props.onCancel} color="#ff5f5f" />
            </View>
            <View style={styles.button}>
              <Button
                title="Add food"
                onPress={addFoodHandler}
                color="#57cc99"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default FoodInput;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#333",
    borderRadius: 12,
    width: "90%",
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  gradientInput: {
    width: "100%",
    borderRadius: 8,
    padding: 2,
  },
  textInput: {
    backgroundColor: "#00000090",
    color: "#fff",
    borderRadius: 6,
    width: "100%",
    padding: 14,
    textAlign: "center",
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
