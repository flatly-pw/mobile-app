// Why this import is necessary? See: https://reactnavigation.org/docs/stack-navigator/#installation
import "react-native-gesture-handler";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { MD3LightTheme, adaptNavigationTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeAreaScreenWrapper from "./components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "./contexts/AuthContext";
import AuthScreen from "./features/AuthScreen/AuthScreen";
import HelloWorldFeature from "./features/HelloWorldFeature/HelloWorldFeature";
import HomeTab from "./features/HomeTab/HomeTab";
import SignOutTab from "./features/SignOutTab/SignOutTab";
import SignInData from "./interfaces/SignInData";
import SignUpData from "./interfaces/SignUpData";

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
      {/* TODO: REMOVE THIS SCREEN AFETER PROFILE WILL BE IMPLEMENTED! */}
      {/* IMPORTANT NOTE: this tab screen in temporary (only for development).
       * In the final application, signOut button will be in profile tab.
       */}
      <Tab.Screen
        name="SignOut"
        children={() => (
          <SafeAreaScreenWrapper>
            <SignOutTab />
          </SafeAreaScreenWrapper>
        )}
        options={{
          tabBarLabel: "DEV: SignOut",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export default function App() {
  // https://reactnavigation.org/docs/auth-flow/
  const [state, dispatch] = React.useReducer(
    (
      prevState: { isLoading: boolean; isSignout: boolean; userToken: string | null },
      action: { type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT"; token?: string | null }
    ) => {
      if (action.token) {
        SecureStore.setItemAsync("userToken", action.token);
      } else {
        SecureStore.deleteItemAsync("userToken");
      }

      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    (async () => {
      let userToken: string | null;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch {
        // Token was not found in the secure store. User is not authenticated.
        userToken = null;
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    })();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: SignInData) => {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          dispatch({ type: "SIGN_IN", token: responseData.jwttoken });
        } else {
          dispatch({ type: "SIGN_IN", token: null });
        }
      },
      signOut: async () => {
        await fetch(process.env.EXPO_PUBLIC_API_URL + "/auth/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data: SignUpData) => {
        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          dispatch({ type: "SIGN_IN", token: responseData.jwttoken });
        } else {
          dispatch({ type: "SIGN_IN", token: null });
        }
      },
    }),
    []
  );

  return (
    <PaperProvider theme={MD3LightTheme}>
      <SafeAreaProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={LightTheme}>
            {state.userToken === null ? <AuthScreen /> : <AppContent />}
          </NavigationContainer>
        </AuthContext.Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
