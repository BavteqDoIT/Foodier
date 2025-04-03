import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function FoodItem(props) {
  return (
    <View style={styles.foodItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressedItem]}
      >
        <LinearGradient
          colors={["#57cc99", "#38a3a5"]}
          style={styles.gradientBackground}
        >
          <Text style={styles.foodText}>{props.text}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default FoodItem;

const styles = StyleSheet.create({
  foodItem: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden", // Zapobiega wyciekaniu efektu ripple
    elevation: 5, // Cień dla Androida
    shadowColor: "#000", // Cień dla iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pressable: {
    flex: 1,
  },
  pressedItem: {
    opacity: 0.7,
  },
  gradientBackground: {
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  foodText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
