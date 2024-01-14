import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

interface CompanionProps {
  name: string;
  description: string;
  value: number;
  valueHandler: (newValue: number) => void;
}

const Companion = ({ name, description, value, valueHandler }: CompanionProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}>
      <View style={{ flex: 1 }}>
        <Text variant="titleLarge">{name}</Text>
        <Text variant="bodySmall">{description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <IconButton
          icon="minus-circle-outline"
          size={28}
          onPress={() => valueHandler(value - 1)}
          disabled={value === 0}
        />
        <Text
          variant="titleLarge"
          style={{
            width: 30,
            textAlign: "center",
          }}>
          {value}
        </Text>
        <IconButton icon="plus-circle-outline" size={28} onPress={() => valueHandler(value + 1)} />
      </View>
    </View>
  );
};

export default Companion;
