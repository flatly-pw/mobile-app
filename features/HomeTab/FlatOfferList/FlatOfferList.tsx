import { useCallback, useContext, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { IconButton, Searchbar, useTheme } from "react-native-paper";

import FlatOfferListItem from "./FlatOfferListItem/FlatOfferListItem";
import SettingsContext from "../../../contexts/SettingsContext";
import FlatOffer from "../../../interfaces/FlatOffer";
import translations from "../../../translations/translations";

const defaultFlatOffers: FlatOffer[] = [];

for (let i = 0; i < 10; ++i) {
  defaultFlatOffers.push({
    id: i.toString(),
    name: "Hackney",
    city: "London",
    price: Math.floor(Math.random() * (100 - 30 + 1) + 30),
    rating: Math.random() * 5,
    distanceFromCenter: Math.floor(Math.random() * (10 - 0 + 1) + 0),
    imageSource:
      "https://media.architecturaldigest.com/photos/5845c567caee54856138ed69/4:3/w_2016,h_1512,c_limit/london-hotels-05.jpg",
  });
}

const FlatOfferList = ({ route, navigation }) => {
  const theme = useTheme();

  const { settings } = useContext(SettingsContext);

  const [flatOffers, setFlatOffers] = useState<FlatOffer[]>(defaultFlatOffers);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <View
      style={{
        height: "100%",
      }}>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}>
        <Searchbar
          value=""
          placeholder={translations.WHERE_TO[settings.language]}
          onPressIn={() => {
            navigation.navigate("BasicFilter");
          }}
          style={{
            flex: 10,
          }}
          showSoftInputOnFocus={false}
        />
        <IconButton
          icon="filter-variant"
          iconColor={theme.colors.primary}
          size={32}
          onPress={() => {
            navigation.navigate("AdvancedFilter");
          }}
        />
      </View>
      <FlatList
        data={flatOffers}
        renderItem={({ item }) => (
          <FlatOfferListItem route={route} navigation={navigation} flatOffer={item} />
        )}
        keyExtractor={(flatOffer: FlatOffer) => flatOffer.id}
        contentContainerStyle={{
          flexGrow: 1,
          overflow: "visible",
          minHeight: "100%",
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default FlatOfferList;
