import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import FoodItem from "./components/FoodItem";
import FoodInput from "./components/FoodInput";

export default function App() {
  const [foods, setFood] = useState([]);

  function addFoodHandler(enteredFoodText) {
    setFood((currentFoods) => [
      ...currentFoods,
      { text: enteredFoodText, id: Math.random().toString() },
    ]);
  }

  function deleteFoodHandler(id) {
    setFood((currentFoods) => {
      return currentFoods.filter((food) => food.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <FoodInput onAddFood={addFoodHandler} />
      <View style={styles.foodContainer}>
        <FlatList
          data={foods}
          renderItem={(itemData) => {
            return (
              <FoodItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteFoodHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  foodContainer: {
    flex: 5,
  },
});
