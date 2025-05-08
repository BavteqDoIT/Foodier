import { Button, View } from "react-native";
import { CommonActions } from '@react-navigation/native';

function AddProduct({ navigation }) {
  return (
    <View>
      <Button
        title="Press"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "HomePage" }, { name: "ProductsList" }],
            })
          )
        }
      />
    </View>
  );
}

export default AddProduct;
