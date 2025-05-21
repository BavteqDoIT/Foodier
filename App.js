import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import HomePage from "./screens/HomePage";
import { Colors } from "./constants/colors";
import PlacesList from "./screens/PlacesList";
import ProductsList from "./screens/ProductsList";
import AddPlace from "./screens/AddPlace";
import AddProduct from "./screens/AddProduct";
import { useEffect, useState } from "react";
import { init, listMetaDataOfDatabase } from "./util/database";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Loading from "./components/Loading";
import ProductDetail from "./screens/ProductDetail";
import PlaceDetail from "./screens/PlaceDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await init();
        await listMetaDataOfDatabase();
        setIsReady(true);
      } catch (e) {
        console.error("Database failed to initialize", e);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerTitleAlign: "center",
              title: "Foodier",
            }}
          />
          <Stack.Screen
            name="PlacesList"
            component={PlacesList}
            options={{
              headerTitleAlign: "center",
              title: "Your places",
            }}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              headerTitleAlign: "center",
              title: "Add new Place",
            }}
          />
          <Stack.Screen
            name="ProductsList"
            component={ProductsList}
            options={{
              headerTitleAlign: "center",
              title: "Added products",
            }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{
              headerTitleAlign: "center",
              title: "Add new Product",
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
              headerTitleAlign: "center",
              title: "Product Details",
            }}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetail}
            options={{
              headerTitleAlign: "center",
              title: "Place Details",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
