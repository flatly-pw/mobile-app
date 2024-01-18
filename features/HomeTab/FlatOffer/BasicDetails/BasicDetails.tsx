import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const BasicDetails = () => {
  const { settings } = useContext(SettingsContext);
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <IconButton icon="home" iconColor={theme.colors.primary} size={40} style={{ zIndex: 1 }} />
      </View>
      <View style={styles.itemContainer}>
        <Text style={{ paddingTop: 24, fontSize: 14, marginLeft: -20 }}>35m2</Text>
      </View>
      <View style={styles.itemContainer}>
        <IconButton
          icon="human-male"
          iconColor={theme.colors.primary}
          size={40}
          style={{ zIndex: 1 }}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={{ paddingTop: 24, fontSize: 14, marginLeft: -20 }}>
          max. 4 {translations.PEOPLE[settings.language]}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <IconButton
          icon="shower"
          iconColor={theme.colors.primary}
          size={40}
          style={{ zIndex: 1 }}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={{ paddingTop: 24, fontSize: 14, marginLeft: -20 }}>
          2 {translations.BATHROOMS_LOWERCASE[settings.language]}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <IconButton
          icon="bed-empty"
          iconColor={theme.colors.primary}
          size={40}
          style={{ zIndex: 1 }}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={{ paddingTop: 24, fontSize: 14, marginLeft: -20 }}>
          2 {translations.BEDROOMS_LOWERCASE[settings.language]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    marginBottom: 30,
  },
  itemContainer: {
    width: "25%",
  },
});

export default BasicDetails;
