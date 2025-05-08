import UniversalList from "../components/UniversalList";

function ProductsList({ navigation }) {
  const data = [{ name: "Burgier" }, { name: "Tomato" }];

  return (
    <UniversalList
      data={data}
      emptyMessage="No products added yet!"
      onAdd={() =>
        navigation.navigate("AddProduct")
      }
    />
  );
}

export default ProductsList;