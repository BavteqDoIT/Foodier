import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { init, getAllProducts, addProductToPlace } from "../util/database";
import Loading from "../components/Loading";
import { Colors } from "../constants/colors";

function AddProductToPlace({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { placeId } = route.params;


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      await init();
      const loadedProducts = await getAllProducts();
      setProducts(loadedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const openDateModal = (productId) => {
    setSelectedProductId(productId);
    setExpirationDate("");
    setModalVisible(true);
  };

  const handleAddProduct = async () => {
    if (!expirationDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert("Invalid date", "Please enter date in YYYY-MM-DD format");
      return;
    }

    try {
      await addProductToPlace(placeId, selectedProductId, expirationDate);
      Alert.alert("Success", "You've added your product!");
      setModalVisible(false);
      navigation.replace('PlaceDetail', { placeId});
    } catch (error) {
      Alert.alert("Error", "We cannot add your product");
      console.log("Add product error:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your product</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => openDateModal(item.id)}
          >
            <Text style={styles.productName}>{item.name}</Text>
            {item.code && <Text style={styles.productCode}>🔖 {item.code}</Text>}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>You need to add product first</Text>
        }
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter expiration date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={expirationDate}
              onChangeText={setExpirationDate}
              keyboardType="numeric"
              maxLength={10}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add" onPress={handleAddProduct} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AddProductToPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray900,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  productItem: {
    backgroundColor: Colors.gray800,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  productName: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  productCode: {
    fontSize: 13,
    color: "#ccc",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "white",
    fontStyle: "italic",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.gray700,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
