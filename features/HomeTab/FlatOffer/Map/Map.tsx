import { useContext } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const Map = ({ data }) => {
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
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker coordinate={{ latitude: data.latitude, longitude: data.longitude }} />
      </MapView>
      <Text>
        {data.street}
        {"\n"}
        {data.postalCode} {data.city}, {data.country}
      </Text>
    </View>
  );
};

export default Map;
