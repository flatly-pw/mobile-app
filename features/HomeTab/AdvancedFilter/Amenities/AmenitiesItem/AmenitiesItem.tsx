import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

interface AmenitiesItemProps {
  label: string;
  status: boolean;
  statusHandler: (newValue: boolean) => void;
}

const AmenitiesItem = ({ label, status, statusHandler }: AmenitiesItemProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
      <Text variant="titleMedium" style={{ flex: 1 }}>
        {label}
      </Text>
      <Checkbox status={status ? "checked" : "unchecked"} onPress={() => statusHandler(!status)} />
    </View>
  );
};

export default AmenitiesItem;
