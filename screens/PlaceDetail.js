import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { init } from "../util/database";
import Loading from "../components/Loading";

function PlaceDetail({ route }) {
  const [place, setPlace] = useState(null);
  const { placeId } = route.params;

  useEffect(() => {
    const fetchPlace = async () => {
      const db = await init();
      const result = await db.getFirstAsync(
        "SELECT * FROM places WHERE id = ?;",
        [placeId]
      );
      setPlace(result);
    };

    fetchPlace();
  }, [placeId]);

  if (!place) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.detail}>Description: {place.description}</Text>
    </View>
  );
}

export default PlaceDetail;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 6 },
  text: { color: "white", fontSize: 16, textAlign: "center", marginTop: 50 },
});
