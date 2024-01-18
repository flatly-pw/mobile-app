import { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const Description = () => {
  const { settings } = useContext(SettingsContext);
  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={{ fontSize: 20 }}>{translations.DESCRIPTION[settings.language]}</Text>
      <Text>Luxury Marriott hotel in center of Warsaw</Text>
    </View>
  );
};

export default Description;
