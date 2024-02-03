import * as SecureStore from "expo-secure-store";
import { useCallback, useContext, useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { ActivityIndicator, IconButton, Searchbar, Text, useTheme } from "react-native-paper";

import FlatOfferListItem from "./FlatOfferListItem/FlatOfferListItem";
import FiltersContext from "../../../contexts/FiltersContext";
import SettingsContext from "../../../contexts/SettingsContext";
import FlatOffer from "../../../interfaces/FlatOffer";
import translations from "../../../preferences/translations";

const FlatOfferList = ({ route, navigation }) => {
  const theme = useTheme();

  const { settings } = useContext(SettingsContext);
  const { filters } = useContext(FiltersContext);

  const [flatOffers, setFlatOffers] = useState<FlatOffer[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);

  const createFilterParameters = (fetchPage: number) => {
    let params = `?page=${fetchPage}&pageSize=10`;

    if (!filters) {
      return params;
    }

    const { city, country, startDate, endDate, beds, bedrooms, bathrooms, adults, children, pets } =
      filters;

    params += city.length > 0 ? `&city=${city}` : "";
    params += country.length > 0 ? `&country=${country}` : "";
    params += startDate.length > 0 ? `&startDate=${startDate}` : "";
    params += endDate.length > 0 ? `&endDate=${endDate}` : "";

    params += beds > 0 ? `&beds=${beds}` : "";
    params += bedrooms > 0 ? `&bedrooms=${bedrooms}` : "";
    params += bathrooms > 0 ? `&bathrooms=${bathrooms}` : "";
    params += adults > 0 ? `&adults=${adults}` : "";
    params += children > 0 ? `&children=${children}` : "";
    params += pets > 0 ? `&pets=${pets}` : "";

    return params;
  };

  const setFlatOffetsFromFetch = (data: any[]) => {
    try {
      const transformedFlatOffets: FlatOffer[] = [];
      data.map((flatOffer) => {
        transformedFlatOffets.push({
          id: flatOffer.id,
          name: flatOffer.title,
          city: flatOffer.city,
          price: flatOffer.pricePerNight,
          rating: flatOffer.rating,
          distanceFromCenter: 0, // TODO: not implemented on backend yet
          imageSource: flatOffer.thumbnail,
        });
      });
      setFlatOffers(transformedFlatOffets);
    } catch (e) {
      setIsError(true);
      console.error(e);
    }
  };

  const fetchFlats = async (fetchPage: number) => {
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

    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/flats" + createFilterParameters(fetchPage),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setFlatOffetsFromFetch(data.data);
      setIsLastPage(data.last);
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

  const onRefresh = useCallback(() => {
    setPage(0);
    setRefreshing(true);
    setIsError(false);
    setIsLastPage(false);
    fetchFlats(0);
    setRefreshing(false);
  }, []);

  const fetchNextPage = () => {
    if (isLastPage) {
      return;
    }
    fetchFlats(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchFlats(page);
  }, [filters]);

  const ListFooter = () => {
    if (!(flatOffers.length > 0) && loading) {
      return <ActivityIndicator animating={loading} size="large" />;
    }
  };

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
      {isError ? (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              minHeight: "100%",
              color: theme.colors.error,
            }}
            variant="headlineSmall">
            Error while fetching resources.
          </Text>
        </RefreshControl>
      ) : loading ? (
        <ActivityIndicator animating={loading} size="large" />
      ) : flatOffers.length > 0 ? (
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
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.8}
          ListFooterComponent={ListFooter}
        />
      ) : (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          <Text
            style={{ textAlign: "center", marginTop: 10, minHeight: "100%" }}
            variant="headlineSmall">
            No flats found.
          </Text>
        </RefreshControl>
      )}
    </View>
  );
};

export default FlatOfferList;
