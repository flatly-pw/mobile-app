import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useContext } from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { Surface } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import FlatOffer from "../../../../interfaces/FlatOffer";
import getPriceWithCurrency from "../../../../preferences/currencies";
import getDistanceWithUnit from "../../../../preferences/measurementSystems";
import translations from "../../../../preferences/translations";

interface FlatOfferListItemProps {
  route: any;
  navigation: any;
  flatOffer: FlatOffer;
}

const FlatOfferListItem = ({ route, navigation, flatOffer }: FlatOfferListItemProps) => {
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

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("FlatOffer", { flatOffer });
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
          <Animated.View style={{ opacity: animated }}>
            <View
              style={{
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                style={{
                  flex: 1,
                  width: "100%",
                  borderRadius: 10,
                }}
                source={{ uri: flatOffer.imageSource }}
                placeholder="LEHLk~WB2yk8pyo0adR*.7kCMdnj"
                contentFit="cover"
                transition={1000}
              />
            </View>

            <View
              style={{
                padding: 5,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                  }}>
                  {flatOffer.name}, {flatOffer.city}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Octicons name="star-fill" size={24} color="black" />
                  <Text
                    style={{
                      padding: 5,
                    }}>
                    {flatOffer.rating.toFixed(2)}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 12,
                }}>
                {getDistanceWithUnit(
                  flatOffer.distanceFromCenter,
                  settings.units,
                  settings.language
                ) +
                  " " +
                  translations.FROM_CENTER[settings.language]}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}>
                {getPriceWithCurrency(flatOffer.price, settings.currency, 0) +
                  " " +
                  translations.PER_NIGHT[settings.language]}
              </Text>
            </View>
          </Animated.View>
        </Surface>
      </View>
    </Pressable>
  );
};

export default FlatOfferListItem;
