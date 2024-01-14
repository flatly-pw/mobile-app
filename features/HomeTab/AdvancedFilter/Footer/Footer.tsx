import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

interface FooterProps {
  navigation: any;
  clearHandler: () => void;
}

const Footer = ({ navigation, clearHandler }: FooterProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: theme.colors.backdrop,
        marginTop: 10,
        padding: 10,
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
        }}>
        Show 873 flats
      </Button>
    </View>
  );
};

export default Footer;
