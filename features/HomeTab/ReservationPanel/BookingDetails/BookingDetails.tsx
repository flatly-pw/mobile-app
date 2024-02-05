import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import getPriceWithCurrency from "../../../../preferences/currencies";

const BookingDetails = ({ data }) => {
  const { settings } = useContext(SettingsContext);
  const theme = useTheme();
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
        }}>
        Reservation details
      </Text>

      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <IconButton
            icon="map-marker"
            iconColor={theme.colors.primary}
            size={40}
            style={{ zIndex: 1 }}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={{ paddingTop: 17, fontSize: 14, marginLeft: -100 }}>
            {data.street}
            {"\n"}
            {data.postalCode} {data.city}, {data.country}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <IconButton
            icon="calendar"
            iconColor={theme.colors.primary}
            size={40}
            style={{ zIndex: 1 }}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={{ paddingTop: 17, fontSize: 14, marginLeft: -100 }}>
            {data.startDate} - {data.endDate} {"\n"}({data.nightsCount} nights)
          </Text>
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
          <Text style={{ paddingTop: 24, fontSize: 14, marginLeft: -100 }}>
            {data.adults} adults, {data.children} children, {data.pets} pets
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <IconButton
            icon="receipt"
            iconColor={theme.colors.primary}
            size={40}
            style={{ zIndex: 1 }}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={{ paddingTop: 24, fontSize: 14, marginLeft: -100 }}>
            {getPriceWithCurrency(data.price * data.nightsCount, settings.currency, 2)}{" "}
          </Text>
        </View>
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
    marginBottom: 20,
  },
  itemContainer: {
    width: "50%",
  },
});

export default BookingDetails;
