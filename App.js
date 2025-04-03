import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import FoodInput from "./components/FoodInput";
import FoodList from "./components/FoodList";
import FoodButton from "./components/FoodButton";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [foods, setFood] = useState([]);

  function startAddFoodHandler() {
    setModalIsVisible(true);
  }

  function endAddFoodHandler() {
    setModalIsVisible(false);
  }

  function addFoodHandler(enteredFoodText) {
    setFood((currentFoods) => [
      ...currentFoods,
      { text: enteredFoodText, id: Math.random().toString() },
    ]);
    endAddFoodHandler();
  }

  function deleteFoodHandler(id) {
    setFood((currentFoods) => currentFoods.filter((food) => food.id !== id));
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={["#4A00E0", "#8E2DE2"]} style={styles.gradient}>
        <View style={styles.appContainer}>
          <FoodButton onPress={startAddFoodHandler} />
          {modalIsVisible && (
            <FoodInput
              visible={modalIsVisible}
              onAddFood={addFoodHandler}
              onCancel={endAddFoodHandler}
            />
          )}
          <FoodList foods={foods} onDeleteItem={deleteFoodHandler} />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
