// Why this import is necessary? See: https://reactnavigation.org/docs/stack-navigator/#installation
import "react-native-gesture-handler";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MD3LightTheme, adaptNavigationTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeAreaScreenWrapper from "./components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import HelloWorldFeature from "./features/HelloWorldFeature/HelloWorldFeature";
import HomeTab from "./features/HomeTab/HomeTab";

const Tab = createBottomTabNavigator();

/* App function was getting cluttered. Now all providers-like wrappers
 * are in App function and app content was moved to AppContent.
 */
const AppContent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: "#dc1c32", headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
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
  );
};

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={LightTheme}>
          <AppContent />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
