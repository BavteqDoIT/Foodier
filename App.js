import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import FoodItem from "./components/FoodItem";
import FoodInput from "./components/FoodInput";

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
    setFood((currentFoods) => {
      return currentFoods.filter((food) => food.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="auto"/>
      <View style={styles.appContainer}>
        <Button
          title="Add new food"
          color="#249909"
          onPress={startAddFoodHandler}
        />
        {modalIsVisible && (
          <FoodInput
            visible={modalIsVisible}
            onAddFood={addFoodHandler}
            onCancel={endAddFoodHandler}
          />
        )}
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
    </>
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
