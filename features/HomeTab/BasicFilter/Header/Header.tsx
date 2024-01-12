import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface HeaderProp {
  navigation: any;
}

const Header = ({ navigation }: HeaderProp) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
      <AntDesign
        name="closecircleo"
        size={24}
        color="black"
        onPress={() => {
          navigation.navigate("FlatOfferList");
        }}
      />
      <Text
        style={{
          textAlign: "center",
          textAlignVertical: "center",
          flex: 1,
          fontSize: 28,
        }}>
        Stays
      </Text>
    </View>
  );
};

export default Header;
