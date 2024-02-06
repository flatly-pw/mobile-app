import { Image } from "expo-image";
import { useContext } from "react";
import { View, Pressable, Animated } from "react-native";
import { Surface, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import Reservation from "../../../../interfaces/Reservation";
import getPriceWithCurrency from "../../../../preferences/currencies";

interface ReservationListItemProps {
  route: any;
  navigation: any;
  reservation: Reservation;
}

const ReservationListItem = ({ route, navigation, reservation }: ReservationListItemProps) => {
  const { settings } = useContext(SettingsContext);

  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const createReservationDate = () => {
    const startDate = new Date(Date.parse(reservation.startDate));
    const endDate = new Date(Date.parse(reservation.endDate));

    const opt: Intl.DateTimeFormatOptions = { month: "short" };
    const startMonth = new Intl.DateTimeFormat(settings.language, opt).format(startDate);
    const endMonth = new Intl.DateTimeFormat(settings.language, opt).format(endDate);

    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}`;
    }

    return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}`;
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ReservationDetails", { reservation });
      }}
      onPressIn={fadeIn}
      onPressOut={fadeOut}>
      <View
        style={{
          padding: 15,
        }}>
        <Surface
          style={{
            borderRadius: 10,
            padding: 5,
          }}>
          <Animated.View style={{ opacity: animated, flexDirection: "row" }}>
            <View
              style={{
                width: "50%",
                height: 150,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                style={{
                  flex: 1,
                  width: "100%",
                  borderRadius: 10,
                }}
                source={{ uri: reservation.thumbnailUrl }}
                placeholder="LEHLk~WB2yk8pyo0adR*.7kCMdnj"
                contentFit="cover"
                transition={1000}
              />
            </View>

            <View
              style={{
                padding: 5,
                justifyContent: "center",
              }}>
              <View>
                <Text style={{ fontWeight: "bold" }} variant="headlineSmall">
                  {reservation.title},
                </Text>
                <Text style={{ fontWeight: "bold" }} variant="headlineSmall">
                  {reservation.city}
                </Text>
                <Text variant="headlineSmall">{createReservationDate()}</Text>
                <Text variant="labelLarge">
                  {getPriceWithCurrency(reservation.totalPrice, settings.currency, 0)}
                </Text>
              </View>
            </View>
          </Animated.View>
        </Surface>
      </View>
    </Pressable>
  );
};

export default ReservationListItem;
