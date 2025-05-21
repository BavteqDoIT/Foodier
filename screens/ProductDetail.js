import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  init,
  getAllPlaces,
  getPlaceForProduct,
  linkProductToPlace,
} from "../util/database";
import Loading from "../components/Loading";
import { Colors } from "../constants/colors";

function ProductDetail({ route }) {
  const [product, setProduct] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [originalPlaceId, setOriginalPlaceId] = useState(null);
  const { productId } = route.params;

  useEffect(() => {
    const loadData = async () => {
      const db = await init();

      const productData = await db.getFirstAsync(
        "SELECT * FROM products WHERE id = ?;",
        [productId]
      );
      setProduct(productData);

      const placeData = await getAllPlaces();
      setPlaces(placeData);

      const currentPlace = await getPlaceForProduct(productId);
      if (currentPlace) {
        setSelectedPlaceId(currentPlace.id);
        setOriginalPlaceId(currentPlace.id);
      }
    };

    loadData();
  }, [productId]);

  const handleSave = async () => {
    console.log("handleSave called");
    console.log("selectedPlaceId:", selectedPlaceId);
    console.log("originalPlaceId:", originalPlaceId);

    if (!selectedPlaceId || selectedPlaceId === "") {
      Alert.alert("Error", "You need to choose a place");
      return;
    }

    if (selectedPlaceId !== originalPlaceId) {
      try {
        await linkProductToPlace(productId, selectedPlaceId);
        Alert.alert("Success", "Product has been asigned to new place");
        setOriginalPlaceId(selectedPlaceId);
      } catch (error) {
        console.error("Error during saving", error);
        Alert.alert("Error", "Something went wrong during saving");
      }
    } else {
      Alert.alert("You need to change something to save", "To go back press back arrow");
    }
  };

  if (!product) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.detail}>Expires: {product.dateOfExpiration}</Text>
      <Text style={styles.detail}>Code: {product.code || "N/A"}</Text>

      <Text style={styles.label}>📦 Choose place:</Text>
      <Picker
        selectedValue={selectedPlaceId}
        onValueChange={setSelectedPlaceId}
        style={styles.picker}
      >
        <Picker.Item label="-- Choose place --" value={""} />
        {places.map((place) => (
          <Picker.Item key={place.id} label={place.name} value={place.id} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    marginBottom: 6,
    color: "white",
    textAlign: "center",
  },
  label: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  picker: {
    backgroundColor: Colors.gray800,
    borderRadius: 8,
    marginBottom: 20,
    color: "white"
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
