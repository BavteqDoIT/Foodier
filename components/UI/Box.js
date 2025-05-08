import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function Box({ icon, size = 24, color = "black", title, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { width: size * 1.3, height: size * 1.3},
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <Ionicons name={icon} size={size} color={color} />
        {title && <Text style={[styles.title, {fontSize : size / 4}]}>{title}</Text>}
      </View>
    </Pressable>
  );
}

export default Box;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors. primary500,
    borderRadius: 8,
    backgroundColor: Colors.primary600,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  pressed: {
    opacity: 0.7,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: Colors.primary100,
    fontWeight: "bold",
  },
});
