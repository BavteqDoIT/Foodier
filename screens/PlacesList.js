import UniversalList from "../components/UniversalList";

function PlacesList({ navigation }) {
  const data = [{ name: "Fridge" }, { name: "Pantry" }, { name: "Freezer" }];

  return (
    <UniversalList
      data={data}
      emptyMessage="No places added yet!"
      onAdd={() => navigation.navigate("AddPlace")}
    />
  );
}

export default PlacesList;
