import { View } from "react-native";
import { useTheme, Button } from "react-native-paper";

interface HeaderProp {
  navigation: any;
  clearHandler: () => void;
  isSearching: boolean;
}

const Footer = ({ navigation, clearHandler, isSearching }: HeaderProp) => {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: theme.colors.backdrop,
        marginTop: 10,
        padding: 10,
        display: isSearching ? "none" : "flex",
      }}>
      <Button
        style={{ flex: 1, alignItems: "flex-start" }}
        labelStyle={theme.fonts.titleLarge}
        onPress={clearHandler}>
        Clear all
      </Button>
      <Button
        style={{ alignItems: "flex-end" }}
        mode="outlined"
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {
          navigation.navigate("FlatOfferList");
        }}
        icon="magnify">
        Search
      </Button>
    </View>
  );
};

export default Footer;
