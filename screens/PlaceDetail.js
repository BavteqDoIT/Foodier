import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { init, getProductsInPlace } from "../util/database";
import Loading from "../components/Loading";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";

function PlaceDetail({ route, navigation }) {
  const [place, setPlace] = useState(null);
  const [products, setProducts] = useState([]);
  const { placeId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const db = await init();
      const result = await db.getFirstAsync(
        "SELECT * FROM places WHERE id = ?;",
        [placeId]
      );
      setPlace(result);

      const loadedProducts = await getProductsInPlace(placeId);
      setProducts(loadedProducts);
    };

    fetchData();
  }, [placeId]);

  if (!place) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.detail}>Description: {place.description}</Text>

      <Text style={styles.subtitle}>Produkty:</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.linkId.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDate}>🕒 {item.dateOfExpiration}</Text>
            {item.code && <Text style={styles.productCode}>🔖 {item.code}</Text>}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>You didn't add any products</Text>}
      />
      <IconButton
          icon={"add-circle-outline"}
          color={Colors.primary500}
          size={45}
          onPress={() => navigation.replace("AddProductToPlace", {placeId})}
        />
    </View>
  );
}

export default PlaceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    marginBottom: 6,
  },
  detail: {
    fontSize: 16,
    color: "white",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
  },
  productItem: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  productDate: {
    fontSize: 14,
    color: "white",
    marginBottom: 2,
  },
  productCode: {
    fontSize: 13,
    color: "white",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "white",
    fontStyle: "italic",
  },
});
