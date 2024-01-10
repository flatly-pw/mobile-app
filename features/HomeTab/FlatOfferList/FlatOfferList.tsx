import { Octicons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { useCallback, useState } from "react";
import { View, Pressable, FlatList, RefreshControl } from "react-native";

import FlatOfferListItem from "./FlatOfferListItem/FlatOfferListItem";
import FlatOffer from "../../../interfaces/FlatOffer";

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
        <SearchBar
          lightTheme
          placeholder="Where to?"
          onPressIn={() => {
            navigation.navigate("BasicFilter");
          }}
          containerStyle={{
            borderRadius: 100,
            flex: 10,
          }}
          inputContainerStyle={{
            backgroundColor: "transparent",
          }}
          showSoftInputOnFocus={false}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("AdvancedFilter");
          }}>
          <Octicons name="filter" size={24} color="black" style={{ paddingLeft: 10 }} />
        </Pressable>
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
