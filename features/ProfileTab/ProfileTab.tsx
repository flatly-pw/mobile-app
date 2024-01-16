import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./MainScreen/MainScreen";
import PreferencesScreen from "./PreferencesScreen/PreferencesScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";

const ProfileTab = ({ route, navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="ProfileScreen"
        children={(props) => (
          <ProfileScreen {...props} bottomTabsRoute={route} bottomTabsNavigation={navigation} />
        )}
      />
      <Stack.Screen
        name="PreferencesScreen"
        children={(props) => (
          <PreferencesScreen {...props} bottomTabsRoute={route} bottomTabsNavigation={navigation} />
        )}
      />
    </Stack.Navigator>
  );
};

export default ProfileTab;
