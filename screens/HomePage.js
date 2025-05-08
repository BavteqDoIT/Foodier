import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import Box from "../components/UI/Box";

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Box
        icon="archive-outline"
        size={200}
        color={Colors.primary500}
        title={"Places"}
        onPress={() => navigation.navigate("PlacesList")}
      />
      <Box
        icon="fast-food-outline"
        size={200}
        color={Colors.primary500}
        title={"Products"}
        onPress={() => navigation.navigate("ProductsList")}
      />
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    padding: 50,
    alignItems: "center",
    gap: 50,
  },
});
