import { useEffect } from "react";
import { View } from "react-native";

import Header from "./Header/Header";
import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";

interface SectionScreenProps {
  route: any;
  navigation: any;
  bottomTabsRoute: any;
  bottomTabsNavigation: any;
  children: React.JSX.Element | React.JSX.Element[];
  label: string;
}

const SectionScreen = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
  children,
  label,
}: SectionScreenProps) => {
  useEffect(() => {
    bottomTabsNavigation.setOptions({ tabBarStyle: { display: "none" } });

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      bottomTabsNavigation.setOptions({ tabBarStyle: { display: "flex" } });
      navigation.navigate("MainScreen");
    });
  }, [bottomTabsNavigation, navigation]);

  return (
    <SafeAreaScreenWrapper>
      <Header route={route} navigation={navigation} label={label} />
      <View style={{ height: "100%", marginTop: 10 }}>{children}</View>
    </SafeAreaScreenWrapper>
  );
};

export default SectionScreen;
