import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import IconButton from "./UI/IconButton";

function UniversalList({ data, emptyMessage, onAdd, renderItem,  onItemPress}) {
  return (
    <>
      <ScrollView
        contentContainerStyle={data.length === 0 && styles.emptyScrollview}
        style={styles.scrollview}
      >
        {data.length === 0 ? (
          <Text style={styles.text}>{emptyMessage}</Text>
        ) : (
          data.map((item, index) => {
            console.log(item);
            return renderItem ? (
              renderItem(item, index)
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.itemContainer,
                  pressed && styles.pressed,
                ]}
                key={item.id}
                onPress={() => onItemPress?.(item)}
              >
                <Text style={styles.itemTitle}>{item.name}</Text>
                {item.dateOfExpiration && (
                  <Text style={styles.itemDetail}>
                    Expires: {item.dateOfExpiration}
                  </Text>
                )}
                {item.description && (
                  <Text style={styles.itemDetail}>
                    Description: {item.description}
                  </Text>
                )}
                {item.code && (
                  <Text style={styles.itemDetail}>Code: {item.code}</Text>
                )}
              </Pressable>
            );
          })
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
  itemContainer: {
    backgroundColor: Colors.gray800,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
  },
  itemTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemDetail: {
    color: "#ccc",
    fontSize: 14,
  },
});
