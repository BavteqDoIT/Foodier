import React, { useEffect, useState } from "react";
import UniversalList from "../components/UniversalList";
import { init } from "../util/database";
import Loading from "../components/Loading";

function ProductsList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const db = await init();
      const rows = await db.getAllAsync("SELECT id, name, code FROM products;");
      setProducts(rows);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchProducts);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <UniversalList
      data={products}
      emptyMessage="No products added yet!"
      onAdd={() => navigation.navigate("AddProduct")}
      onItemPress={(item) => navigation.navigate("ProductDetail", {productId: item.id})}
      refreshList={fetchProducts}
    />
  );
}

export default ProductsList;
