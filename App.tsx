// Why this import is necessary? See: https://reactnavigation.org/docs/stack-navigator/#installation
import "react-native-gesture-handler";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { useState } from "react";
import { MD3LightTheme, adaptNavigationTheme, PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LocaleConfig from "xdate";

import SafeAreaScreenWrapper from "./components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "./contexts/AuthContext";
import SettingsContext from "./contexts/SettingsContext";
import AuthScreen from "./features/AuthScreen/AuthScreen";
import HelloWorldFeature from "./features/HelloWorldFeature/HelloWorldFeature";
import HomeTab from "./features/HomeTab/HomeTab";
import ProfileTab from "./features/ProfileTab/ProfileTab";
import SignInData from "./interfaces/SignInData";
import SignUpData from "./interfaces/SignUpData";
import UserSettings from "./interfaces/UserSettings";
import translations from "./translations/translations";

const Tab = createBottomTabNavigator();

/* App function was getting cluttered. Now all providers-like wrappers
 * are in App function and app content was moved to AppContent.
 */
const AppContent = () => {
  const theme = useTheme();

  const [settings, setSettings] = useState<UserSettings>({
    name: "David",
    lastName: "Robinson",
    email: "dawid.robinson@gmail.com",
    currency: "USD",
    units: "metric",
    language: "pl-PL",
  });

  const value = { settings, setSettings };

  React.useEffect(() => {
    LocaleConfig.locales[""].dayNames = [
      translations.SUNDAY[settings.language],
      translations.MONDAY[settings.language],
      translations.TUESDAY[settings.language],
      translations.WEDNESDAY[settings.language],
      translations.THURSDAY[settings.language],
      translations.FRIDAY[settings.language],
      translations.SATURDAY[settings.language],
    ];
    LocaleConfig.locales[""].dayNamesShort = [
      translations.SUN[settings.language],
      translations.MON[settings.language],
      translations.TUE[settings.language],
      translations.WED[settings.language],
      translations.THU[settings.language],
      translations.FRI[settings.language],
      translations.SAT[settings.language],
    ];
    LocaleConfig.locales[""].monthNames = [
      translations.JANUARY[settings.language],
      translations.FEBRUARY[settings.language],
      translations.MARCH[settings.language],
      translations.APRIL[settings.language],
      translations.MAY[settings.language],
      translations.JUNE[settings.language],
      translations.JULY[settings.language],
      translations.AUGUST[settings.language],
      translations.SEPTEMBER[settings.language],
      translations.OCTOBER[settings.language],
      translations.NOVEMBER[settings.language],
      translations.DECEMBER[settings.language],
    ];
    LocaleConfig.locales[""].monthNamesShort = [
      translations.JAN[settings.language],
      translations.FEB[settings.language],
      translations.MAR[settings.language],
      translations.APR[settings.language],
      translations.MAY[settings.language],
      translations.JUN[settings.language],
      translations.JUL[settings.language],
      translations.AUG[settings.language],
      translations.SEP[settings.language],
      translations.OCT[settings.language],
      translations.NOV[settings.language],
      translations.DEC[settings.language],
    ];
  }, [settings.language]);

  return (
    <SettingsContext.Provider value={value}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ tabBarActiveTintColor: theme.colors.primary, headerShown: false }}>
        <Tab.Screen
          name="Home"
          children={(props) => <HomeTab {...props} />}
          options={{
            tabBarLabel: translations.HOME[settings.language],
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
            tabBarLabel: translations.BOOKINGS[settings.language],
            tabBarIcon: ({ color, size }) => <AntDesign name="book" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarLabel: translations.PROFILE[settings.language],
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SettingsContext.Provider>
  );
};

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

export default function App() {
  // https://reactnavigation.org/docs/auth-flow/
  const [state, dispatch] = React.useReducer(
    (
      prevState: { isLoading: boolean; isSignout: boolean; userToken: string | null },
      action: { type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT"; token: string | null }
    ): {
      userToken: string | null;
      isLoading: boolean;
      isSignout: boolean;
    } => {
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
          return true;
        }
        dispatch({ type: "SIGN_IN", token: null });
        return false;
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT", token: null });
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
          return true;
        }
        dispatch({ type: "SIGN_IN", token: null });
        return false;
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
