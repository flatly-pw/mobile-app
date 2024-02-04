import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import Header from "./Header/Header";
import MainScreen from "../ProfileTab/MainScreen/MainScreen";
import PreferencesScreen from "../ProfileTab/PreferencesScreen/PreferencesScreen";
import ProfileScreen from "../ProfileTab/ProfileScreen/ProfileScreen";

const BookingsTab = ({ route, navigation }) => {
  const Stack = createStackNavigator();

  return (
    <View style={{ height: "100%", marginTop: 10 }}>
      <Header navigation={navigation} />
    </View>
  );
};

export default BookingsTab;
