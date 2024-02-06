import { Octicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import getPriceWithCurrency from "../../../../preferences/currencies";
import Gallery from "../Gallery/Gallery";

const OfficelyWindow = ({ data, isOfficeReservation, setIsOfficeReservation }) => {
  const { settings } = useContext(SettingsContext);
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [plnRate, setPlnRate] = useState();

  const fetchRate = async () => {
    setLoading(true);
    let userToken: string | null;
    try {
      userToken = await SecureStore.getItemAsync("userToken");
    } catch {
      // Token was not found in the secure store. User is not authenticated.
      userToken = null;
    }

    if (!userToken) {
      setIsError(true);
      return;
    }

    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/currency/exchangeRates", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });

    if (response.ok) {
      const rateData = await response.json();
      setPlnRate(rateData.pln);
      data.pricePerDay /= rateData.pln;
    } else {
      console.error(
        "Problem with fetch, status text:",
        response.statusText,
        ", status code:",
        response.status
      );
      setIsError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRate();
  }, []);

  return (
    <View
      style={{
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
        }}>
        Save time and book an office space with the Officely app right away!
      </Text>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={{ fontSize: 16 }}>{data.name}</Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 130 }}>
          <Octicons name="star-fill" size={24} color="black" />
          <Text
            style={{
              padding: 5,
            }}>
            {data.rating.toFixed(2)}
          </Text>
        </View>
      </View>
      <Gallery imageSource={data.mainPhoto} />
      <Text style={{ fontSize: 16, marginBottom: 20 }}>{data.address}</Text>
      {plnRate ? (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: -10,
            padding: 10,
          }}>
          <Button
            style={{ flex: 1, alignItems: "flex-start" }}
            labelStyle={theme.fonts.titleMedium}>
            {getPriceWithCurrency(data.pricePerDay, settings.currency, 0)} per day
          </Button>
          <Button
            style={{ alignItems: "flex-end" }}
            mode="outlined"
            labelStyle={theme.fonts.titleMedium}
            onPress={() => setIsOfficeReservation(!isOfficeReservation)}>
            {isOfficeReservation ? "Added to reservation" : "Add to reservation"}
          </Button>
        </View>
      ) : (
        <Button style={{ flex: 1, alignItems: "flex-start" }} labelStyle={theme.fonts.titleMedium}>
          Calculating...
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    marginTop: 10,
  },
  itemContainer: {
    width: "50%",
  },
});

export default OfficelyWindow;
