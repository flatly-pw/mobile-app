import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";

const Header = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
      <MaterialIcons name="person-pin" size={129} color="black" style={{ elevation: 4 }} />
      <View style={{ alignItems: "center", flex: 1 }}>
        <View>
          <Text variant="displaySmall" style={{ fontWeight: "bold" }}>
            {settings.name}
          </Text>
          <Text variant="displaySmall">{settings.lastName}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
