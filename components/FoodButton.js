import { Button, StyleSheet, View } from "react-native";

function FoodButton({ onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Add new food" color="#57cc99" onPress={onPress} />
    </View>
  );
}

export default FoodButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
  },
});
