// Why this import is necessary? See: https://reactnavigation.org/docs/stack-navigator/#installation
import "react-native-gesture-handler";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeAreaScreenWrapper from "./components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import HelloWorldFeature from "./features/HelloWorldFeature/HelloWorldFeature";
import HomeTab from "./features/HomeTab/HomeTab";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ tabBarActiveTintColor: "#dc1c32", headerShown: false }}>
          <Tab.Screen
            name="Home"
            children={(props) => <HomeTab {...props} />}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Bookings"
            children={() => (
              <SafeAreaScreenWrapper>
                {/* TODO: change this HelloWorldFeature with correct component (components which shows bookings tab) */}
                <HelloWorldFeature />
              </SafeAreaScreenWrapper>
            )}
            options={{
              tabBarLabel: "Bookings",
              tabBarIcon: ({ color, size }) => <AntDesign name="book" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Profile"
            children={() => (
              <SafeAreaScreenWrapper>
                {/* TODO: change this HelloWorldFeature with correct component (components which shows profile tab) */}
                <HelloWorldFeature />
              </SafeAreaScreenWrapper>
            )}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
