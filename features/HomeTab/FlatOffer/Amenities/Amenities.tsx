import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import Amenity from "../../../../interfaces/Amenity";
import translations from "../../../../preferences/translations";

const Amenities = () => {
  const { settings } = useContext(SettingsContext);
  const theme = useTheme();
  const items = ["CHAIR", "TV", "WIFI", "BREAKFAST_INCLUDED", "PRIVATE_BATHROOM"];
  const amenitiesArray: Amenity[] = items.map((item, index) => ({
    id: index + 1,
    label: item,
    checked: true,
  }));

  return (
    <View style={styles.container}>
      {amenitiesArray.map((item) => (
        <View style={styles.listItem} key={item.id}>
          <View style={styles.itemContainer}>
            <IconButton
              icon="check"
              iconColor={theme.colors.primary}
              size={24}
              style={{ zIndex: 1 }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ paddingTop: 14, fontSize: 14, marginLeft: -100 }}>
              {translations[item.label][settings.language]}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  listItem: {
    flexDirection: "row",
  },
  itemContainer: {
    width: "50%",
  },
});

export default Amenities;
