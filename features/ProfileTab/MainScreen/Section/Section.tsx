import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface SectionProps {
  children: React.JSX.Element | React.JSX.Element[];
  label: string;
}

const Section = ({ children, label }: SectionProps) => {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}>
      <Text variant="headlineMedium">{label}</Text>
      <View>{children}</View>
    </View>
  );
};

export default Section;
