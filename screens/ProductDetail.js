import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { init } from "../util/database";
import Loading from "../components/Loading";

function ProductDetail({ route }) {
  const [product, setProduct] = useState(null);
  const { productId } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      const db = await init();
      const result = await db.getFirstAsync(
        "SELECT * FROM products WHERE id = ?;",
        [productId]
      );
      setProduct(result);
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.detail}>Expires: {product.dateOfExpiration}</Text>
      <Text style={styles.detail}>Code: {product.code || "N/A"}</Text>
    </View>
  );
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 6 },
  text: { color: "white", fontSize: 16, textAlign: "center", marginTop: 50 },
});
