import { useContext } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const Owner = () => {
  const { settings } = useContext(SettingsContext);
  return (
    <View>
      <Text style={{ fontSize: 20 }}>{translations.OWNER[settings.language]}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
        <Avatar.Image
          size={80}
          source={{
            uri: "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
          }}
          style={{ elevation: 4 }}
        />
        <View style={{ alignItems: "center", flex: 1 }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Jan Kowalski {"\n"}({translations.ACTIVE_SINCE[settings.language]}{" "}
              {translations.JAN[settings.language]} 2020)
            </Text>
            <Text style={{ fontSize: 14 }}>e-mail: jan.kowalski@mail.com</Text>
            <Text style={{ fontSize: 14 }}>
              {translations.PHONE[settings.language]}: +48 123 456 789
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Owner;
