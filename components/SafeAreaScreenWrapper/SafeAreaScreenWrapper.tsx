import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaScreenWrapperProps {
  children: React.JSX.Element | React.JSX.Element[];
}

const SafeAreaScreenWrapper = ({ children }: SafeAreaScreenWrapperProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        // Paddings to handle safe area, see: https://reactnavigation.org/docs/handling-safe-area/
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {children}
    </View>
  );
};

export default SafeAreaScreenWrapper;
