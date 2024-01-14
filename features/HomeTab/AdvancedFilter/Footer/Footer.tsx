import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

const Footer = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: theme.colors.backdrop,
        paddingTop: 10,
        marginTop: 10,
      }}>
      <Button
        style={{ flex: 1, alignItems: "flex-start" }}
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {}}>
        Clear all
      </Button>
      <Button
        style={{ alignItems: "flex-end" }}
        mode="outlined"
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {}}>
        Show 873 flats
      </Button>
    </View>
  );
};

export default Footer;
