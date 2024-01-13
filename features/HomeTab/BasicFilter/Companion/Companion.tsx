import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "react-native";

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
        <Text style={{ fontSize: 24 }}>{name}</Text>
        <Text style={{ fontSize: 12 }}>{description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <AntDesign
          name="minuscircleo"
          size={28}
          color={value === 0 ? "gray" : "black"}
          onPress={() => {
            valueHandler(value - 1);
          }}
          disabled={value === 0}
        />
        <Text
          style={{
            padding: 10,
            fontSize: 24,
            width: 60,
            textAlign: "center",
          }}>
          {value}
        </Text>
        <AntDesign
          name="pluscircleo"
          size={28}
          color="black"
          onPress={() => {
            valueHandler(value + 1);
          }}
        />
      </View>
    </View>
  );
};

export default Companion;
