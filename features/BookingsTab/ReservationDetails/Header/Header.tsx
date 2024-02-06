import { useContext } from "react";
import { View } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const Header = ({ route, navigation }) => {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);

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
          navigation.navigate("ReservationList");
        }}
        style={{ zIndex: 1 }}
      />
      <Text
        variant="headlineMedium"
        style={{
          textAlign: "center",
          position: "absolute",
          width: "100%",
        }}>
        {translations.RESERVATION_DETAILS[settings.language]}
      </Text>
    </View>
  );
};

export default Header;
