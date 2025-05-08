import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";

function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary500}/>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray700
  },
});
