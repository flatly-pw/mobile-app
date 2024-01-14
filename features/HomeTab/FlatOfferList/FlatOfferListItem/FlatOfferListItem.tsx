import { Octicons } from "@expo/vector-icons";
import { Text, View, Image, Pressable, Animated } from "react-native";
import { Surface } from "react-native-paper";

import FlatOffer from "../../../../interfaces/FlatOffer";

interface FlatOfferListItemProps {
  route: any;
  navigation: any;
  flatOffer: FlatOffer;
}

const FlatOfferListItem = ({ route, navigation, flatOffer }: FlatOfferListItemProps) => {
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
            <Image
              style={{
                height: 300,
                borderRadius: 10,
              }}
              source={{
                uri: flatOffer.imageSource,
              }}
            />

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
                {flatOffer.distanceFromCenter.toFixed(0)} km from center
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}>
                ${flatOffer.price.toFixed(0)} night
              </Text>
            </View>
          </Animated.View>
        </Surface>
      </View>
    </Pressable>
  );
};

export default FlatOfferListItem;
