import { AntDesign } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { View } from "react-native";

interface HeaderProp {
  navigation: any;
  clearHandler: () => void;
  isSearching: boolean;
}

const Footer = ({ navigation, clearHandler, isSearching }: HeaderProp) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        display: isSearching ? "none" : "flex",
      }}>
      <View style={{ flex: 1 }}>
        <Button
          type="clear"
          title="Clear all"
          containerStyle={{ alignSelf: "flex-start" }}
          onPress={clearHandler}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          type="outline"
          containerStyle={{ alignSelf: "flex-end" }}
          buttonStyle={{ borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("FlatOfferList");
          }}>
          <AntDesign name="search1" size={24} color="black" />
          Search
        </Button>
      </View>
    </View>
  );
};

export default Footer;
