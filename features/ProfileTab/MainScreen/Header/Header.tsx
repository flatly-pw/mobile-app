import { useContext } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";

const Header = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
      <Avatar.Image
        size={128}
        source={{
          uri: "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
        }}
        style={{ elevation: 4 }}
      />
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
