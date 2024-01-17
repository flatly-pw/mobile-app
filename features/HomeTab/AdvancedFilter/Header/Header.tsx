import { useContext } from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

interface HeaderProps {
  navigation: any;
}

const Header = ({ navigation }: HeaderProps) => {
  const { settings } = useContext(SettingsContext);

  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.backdrop,
      }}>
      <IconButton
        icon="close-circle-outline"
        iconColor={theme.colors.primary}
        size={32}
        onPress={() => {
          navigation.navigate("FlatOfferList");
        }}
        style={{ zIndex: 1 }}
      />
      <Text
        variant="displaySmall"
        style={{
          textAlign: "center",
          position: "absolute",
          width: "100%",
        }}>
        {translations.FILTERS[settings.language]}
      </Text>
    </View>
  );
};

export default Header;
