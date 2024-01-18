import { useContext } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const Map = () => {
  const { settings } = useContext(SettingsContext);
  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={{ fontSize: 20 }}>{translations.LOCATION[settings.language]}</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: 300,
        }}
        region={{
          latitude: 52.221977,
          longitude: 21.007254,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker coordinate={{ latitude: 52.221977, longitude: 21.007254 }} />
      </MapView>
      <Text>ul. Koszykowa 75{"\n"}00-662 Warszawa</Text>
    </View>
  );
};

export default Map;
