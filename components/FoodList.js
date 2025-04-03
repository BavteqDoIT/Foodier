import { View, FlatList, StyleSheet } from "react-native";
import FoodItem from "./FoodItem";

function FoodList({ foods, onDeleteItem }) {
  return (
    <View style={styles.foodContainer}>
      <FlatList
        data={foods}
        renderItem={(itemData) => (
          <FoodItem
            text={itemData.item.text}
            id={itemData.item.id}
            onDeleteItem={onDeleteItem}
          />
        )}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

export default FoodList;

const styles = StyleSheet.create({
  foodContainer: {
    flex: 5,
  },
});
