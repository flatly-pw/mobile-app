import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeAreaScreenWrapper from "./components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import HelloWorldFeature from "./features/HelloWorldFeature/HelloWorldFeature";

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
            children={() => (
              <SafeAreaScreenWrapper>
                <HelloWorldFeature />
              </SafeAreaScreenWrapper>
            )}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Bookings"
            children={() => (
              <SafeAreaScreenWrapper>
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
