import { useContext } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../translations/translations";

interface FooterProps {
  navigation: any;
  clearHandler: () => void;
}

const Footer = ({ navigation, clearHandler }: FooterProps) => {
  const { settings } = useContext(SettingsContext);

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
      }}>
      <Button
        style={{ flex: 1, alignItems: "flex-start" }}
        labelStyle={theme.fonts.titleLarge}
        onPress={clearHandler}>
        {translations.CLEAR_ALL[settings.language]}
      </Button>
      <Button
        style={{ alignItems: "flex-end" }}
        mode="outlined"
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {
          navigation.navigate("FlatOfferList");
        }}>
        {translations.SHOW_FLATS[settings.language]}
      </Button>
    </View>
  );
};

export default Footer;
