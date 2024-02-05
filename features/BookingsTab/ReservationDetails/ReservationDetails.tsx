import { Entypo } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { ActivityIndicator, Button, Divider, Text, useTheme } from "react-native-paper";

import Header from "./Header/Header";
import SettingsContext from "../../../contexts/SettingsContext";
import Reservation from "../../../interfaces/Reservation";
import ReservationInfo from "../../../interfaces/ReservationInfo";
import getPriceWithCurrency from "../../../preferences/currencies";
import translations from "../../../preferences/translations";

const ReservationDetails = ({ route, navigation }) => {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);

  const reservation: Reservation = route.params.reservation;
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo | null>(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
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

      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL +
          "/reservation/" +
          reservation.reservationId +
          "?reservationId=" +
          reservation.reservationId,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReservationInfo(data as ReservationInfo);
      } else {
        console.log(
          "Problem with fetch, status text:",
          response.statusText,
          ", status code:",
          response.status,
          ", token:",
          userToken
        );
        setIsError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <View style={{ height: "100%" }}>
      <ActivityIndicator animating={isLoading} size="large" style={{ flex: 1 }} />
    </View>
  ) : isError ? (
    <View style={{ height: "100%" }}>
      <Text style={{ flex: 1 }}>
        {translations.ERROR_WHILE_FETCHING_RESOURCES[settings.language]}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Button
          onPress={() => {
            navigation.navigate("ReservationList");
          }}
          mode="elevated"
          style={{ width: "50%", borderRadius: 5 }}>
          {translations.GO_BACK[settings.language]}
        </Button>
      </View>
    </View>
  ) : (
    <ScrollView style={{ height: "100%" }}>
      <Header route={route} navigation={navigation} />
      <View style={{ flex: 1, padding: 15 }}>
        <Text variant="headlineLarge" style={{ fontWeight: "bold", marginBottom: 20 }}>
          {reservation.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo name="calendar" size={24} color="black" style={{ marginRight: 20 }} />
          <View>
            <Text variant="bodyLarge">
              {translations.CHECK_IN[settings.language]}:{" "}
              {new Date(Date.parse(reservation.startDate)).toLocaleString(settings.language)}
            </Text>
            <Text variant="bodyLarge">
              {translations.CHECK_OUT[settings.language]}:{" "}
              {new Date(Date.parse(reservation.endDate)).toLocaleString(settings.language)}
            </Text>
          </View>
        </View>

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo name="location-pin" size={24} color="black" />
          <Text variant="headlineSmall">{translations.EXACT_ADDRESS[settings.language]}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              height: 250,
            }}
            region={{
              latitude: reservationInfo.addressDto.latitude,
              longitude: reservationInfo.addressDto.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker
              coordinate={{
                latitude: reservationInfo.addressDto.latitude,
                longitude: reservationInfo.addressDto.longitude,
              }}
            />
          </MapView>
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        <View>
          <Text variant="headlineSmall">{translations.CONTACT[settings.language]}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="phone" size={24} color="black" style={{ marginRight: 20 }} />
            <Text>{reservationInfo.owner.phoneNumber}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="email" size={24} color="black" style={{ marginRight: 20 }} />
            <Text>{reservationInfo.owner.email}</Text>
          </View>
        </View>

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        <View>
          <Text variant="headlineSmall">
            {translations.BOOKED[settings.language]} {reservationInfo.bedrooms}{" "}
            {translations.ROOM[settings.language].toLowerCase()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="users" size={24} color="black" style={{ marginRight: 20 }} />
            <Text>
              {`${reservationInfo.clientName} ${reservationInfo.clientLastName} - ${
                reservationInfo.adults
              } ${translations.ADULTS[settings.language].toLowerCase()}` +
                (reservationInfo.children > 0
                  ? `, ${reservationInfo.children} ${translations.CHILDREN[
                      settings.language
                    ].toLowerCase()}`
                  : "") +
                (reservationInfo.pets > 0
                  ? `, ${reservationInfo.pets} ${translations.PETS[
                      settings.language
                    ].toLowerCase()}`
                  : "")}
            </Text>
          </View>
        </View>

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        <View>
          <Text variant="headlineSmall">
            {translations.PRICE[settings.language]}:{" "}
            {getPriceWithCurrency(reservationInfo.price, settings.currency, 0)}
          </Text>
        </View>
      </View>
      {reservationInfo.status === "active" ? (
        <View style={{ alignItems: "center" }}>
          <Button
            onPress={async () => {
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

              const response = await fetch(
                process.env.EXPO_PUBLIC_API_URL +
                  "/reservation/cancel/" +
                  reservationInfo.reservationId +
                  "?reservationId=" +
                  reservationInfo.reservationId,
                {
                  method: "PUT",
                  headers: {
                    Authorization: "Bearer " + userToken,
                  },
                }
              );
              if (response.ok) {
                navigation.navigate("ReservationList", { shouldRefresh: true });
              } else {
                console.log(
                  "Problem with fetch, status text:",
                  response.statusText,
                  ", status code:",
                  response.status,
                  ", token:",
                  userToken
                );
              }
            }}
            mode="elevated"
            style={{ width: "50%", borderRadius: 5 }}
            buttonColor={theme.colors.error}
            textColor={theme.colors.errorContainer}>
            {translations.CANCEL_RESERVATION[settings.language]}
          </Button>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default ReservationDetails;
