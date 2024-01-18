import { useContext } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const Gallery = ({ imageSource }) => {
  const { settings } = useContext(SettingsContext);
  return (
    <View>
      <Text style={{ fontSize: 20 }}>{translations.GALLERY[settings.language]}</Text>
      <Image
        style={{
          height: 300,
          borderRadius: 10,
          marginBottom: 10,
        }}
        source={{
          uri: imageSource,
        }}
      />
    </View>
  );
};

export default Gallery;
