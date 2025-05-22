import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import IconButton from "./UI/IconButton";
import { deletePlace, deleteProduct } from "../util/database";
import { useNavigation } from "@react-navigation/native";

function UniversalList({
  data,
  emptyMessage,
  onAdd,
  renderItem,
  onItemPress,
  refreshList,
}) {

  const navigation = useNavigation();
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
                <View style={styles.itemContentRow}>
                  <View style={styles.itemTextContainer}>
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
                  </View>
                  <View style={styles.itemContentRow}>
                    <IconButton
                      icon="create-outline"
                      color="white"
                      size={24}
                      onPress={() => {
                        if (item.code) {
                          navigation.navigate("ProductDetail", {
                            productId: item.id,
                          });
                        } else if (item.description) {
                          navigation.navigate("PlaceEdit",{
                            placeId: item.id,
                          });
                        }
                      }}
                    />
                    <IconButton
                      icon="trash-outline"ś
                      color="white"
                      size={24}
                      onPress={() => {
                        Alert.alert(
                          "Confirm Delete",
                          `Are you sure you want to delete "${item.name}"?`,
                          [
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                            {
                              text: "Delete",
                              style: "destructive",
                              onPress: async () => {
                                try {
                                  if (item.description) {
                                    await deletePlace(item.id);
                                  } else {
                                    await deleteProduct(item.id);
                                  }
                                  refreshList();
                                } catch (err) {
                                  console.error("Failed to delete:", err);
                                }
                              },
                            },
                          ],
                          { cancelable: true }
                        );
                      }}
                    />
                  </View>
                </View>
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
  itemContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
});
