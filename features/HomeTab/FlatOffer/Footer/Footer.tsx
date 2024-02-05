import { useContext } from "react";
import { View } from "react-native";
import { useTheme, Button } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import getPriceWithCurrency from "../../../../preferences/currencies";
import translations from "../../../../preferences/translations";

interface HeaderProp {
  navigation: any;
  price: any;
  data: any;
}

const Footer = ({ navigation, price, data }: HeaderProp) => {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);

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
      <Button style={{ flex: 1, alignItems: "flex-start" }} labelStyle={theme.fonts.titleMedium}>
        {getPriceWithCurrency(price, settings.currency, 0)}{" "}
        {translations.PER_NIGHT[settings.language]}
      </Button>
      <Button
        style={{ alignItems: "flex-end" }}
        mode="outlined"
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {
          navigation.navigate("ReservationPanel", { data });
        }}
        icon="magnify">
        {translations.BOOK_NOW[settings.language]}
      </Button>
    </View>
  );
};

export default Footer;
