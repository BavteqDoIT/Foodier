import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import IconButton from "./UI/IconButton";

function UniversalList({ data, emptyMessage, onAdd, renderItem }) {
  return (
    <>
      <ScrollView
        contentContainerStyle={data.length === 0 && styles.emptyScrollview}
        style={styles.scrollview}
      >
        {data.length === 0 ? (
          <Text style={styles.text}>{emptyMessage}</Text>
        ) : (
          data.map((item, index) =>
            renderItem ? (
              renderItem(item, index)
            ) : (
              <Pressable style={({ pressed }) => [pressed && styles.pressed]} key={index}>
                <Text style={styles.text}>{item.name}</Text>
              </Pressable>
            )
          )
        )}
      </ScrollView>
      <View style={styles.buttons}>
        <IconButton
          icon={"add-circle-outline"}
          color={Colors.primary500}
          size={45}
          onPress={onAdd}
        />
      </View>
    </>
  );
}

export default UniversalList;

const styles = StyleSheet.create({
  scrollview: {
    flex: 4,
    padding: 10,
    backgroundColor: Colors.gray700,
  },
  emptyScrollview: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flex: 0.15,
    padding: 10,
    backgroundColor: Colors.gray700,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
