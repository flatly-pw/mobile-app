import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

interface FilterItemProps {
  children: React.JSX.Element | React.JSX.Element[];
  title: string;
  description?: string;
}

const FilterItem = ({ children, title, description }: FilterItemProps) => {
  const theme = useTheme();

  return (
    <View style={{ padding: 10 }}>
      <View style={{ marginBottom: 15 }}>
        <Text variant="headlineLarge">{title}</Text>
        {description ? <Text variant="bodyMedium">{description}</Text> : null}
      </View>
      {children}
      <Divider theme={theme} style={{ marginTop: 15 }} bold />
    </View>
  );
};

export default FilterItem;
