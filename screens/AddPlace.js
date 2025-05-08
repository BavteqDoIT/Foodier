import { Button, Text, View } from "react-native";
import { CommonActions } from '@react-navigation/native';

function AddPlace({ navigation }) {
  return (
    <View>
      <Button
        title="Press"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "HomePage" }, { name: "PlacesList" }],
            })
          )
        }
      />
    </View>
  );
}

export default AddPlace;
