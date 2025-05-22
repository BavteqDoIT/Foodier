import React, { useEffect, useState } from "react";
import UniversalList from "../components/UniversalList";
import { init } from "../util/database";
import Loading from "../components/Loading";

function PlacesList({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      const db = await init();
      const rows = await db.getAllAsync("SELECT id, name, description FROM places;");
      setPlaces(rows);
    } catch (error) {
      console.error("Failed to fetch places:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchPlaces);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <UniversalList
      data={places}
      emptyMessage="No places added yet!"
      onAdd={() => navigation.navigate("AddPlace")}
      onItemPress={(item) => navigation.navigate("PlaceDetail", {placeId: item.id})}
      refreshList={fetchPlaces}
    />
  );
}

export default PlacesList;
