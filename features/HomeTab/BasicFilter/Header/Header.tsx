import { AntDesign, Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface HeaderProp {
  navigation: any;
  isSearching: boolean;
  isSearchingHandler: (newIsSearching: boolean) => void;
}

const Header = ({ navigation, isSearching, isSearchingHandler }: HeaderProp) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
      {isSearching ? (
        <Feather
          name="arrow-left-circle"
          size={24}
          color="black"
          onPress={() => {
            isSearchingHandler(false);
          }}
        />
      ) : (
        <AntDesign
          name="closecircleo"
          size={24}
          color="black"
          onPress={() => {
            navigation.navigate("FlatOfferList");
          }}
        />
      )}
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
