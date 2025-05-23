import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { init, getAllPlaces, updateProduct, getPlaceForProduct } from "../util/database";
import Loading from "../components/Loading";
import { Colors } from "../constants/colors";

function ProductDetail({ route, navigation }) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const { productId } = route.params;

  useEffect(() => {
    const loadData = async () => {
      const db = await init();

      const productData = await db.getFirstAsync(
        "SELECT * FROM products WHERE id = ?;",
        [productId]
      );
      setProduct(productData);
      setName(productData.name);
      setCode(productData.code || "");

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
    if (!name.trim()) {
      Alert.alert("Validation Error", "Product name is required.");
      return;
    }

    try {
      await updateProduct(productId, name.trim(), code.trim());
      Alert.alert("Success", "Product updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating product", error);
      Alert.alert("Error", "Failed to update product.");
    }
  };

  if (!product) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Product Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Product Name"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Edit Product Code:</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Product Code"
        placeholderTextColor="gray"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    color: "white",
    backgroundColor: Colors.gray800,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
