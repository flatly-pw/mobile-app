import * as SecureStore from "expo-secure-store";
import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { ActivityIndicator, SegmentedButtons, Text, useTheme } from "react-native-paper";

import ReservationListItem from "./ReservationListItem/ReservationListItem";
import SettingsContext from "../../../contexts/SettingsContext";
import Reservation from "../../../interfaces/Reservation";
import translations from "../../../preferences/translations";

type ReservationStatus = "active" | "passed" | "cancelled";

const ReservationList = ({ route, navigation }) => {
  const { settings } = useContext(SettingsContext);
  const shouldRefresh = !!(route.params && route.params.shouldRefresh);
  const theme = useTheme();

  const [status, setStatus] = useState<ReservationStatus>("active");

  const [reservations, setReservation] = useState<Reservation[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);

  const createFilterParameters = (fetchPage: number) => {
    let params = `?page=${fetchPage}&pageSize=100`;
    params += `&filter=${status}`;
    return params;
  };

  const fetchReservations = async (fetchPage: number) => {
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
      process.env.EXPO_PUBLIC_API_URL + "/reservations" + createFilterParameters(fetchPage),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setReservation(data.data as Reservation[]);
      setIsLastPage(data.last);
      setIsError(false);
    } else {
      console.log(
        "Problem with fetch, status text:",
        response.statusText,
        ", status code:",
        response.status,
        ", token:",
        userToken
      );
      // For some reason backend throws 401 UNAUTHRORIZED randomly, to prevent this
      // just refetch after error
      if (response.status === 401) {
        setTimeout(() => {
          if (!loading && isError && reservations.length === 0) {
            fetchReservations(fetchPage);
          }
        }, 1000);
      } else {
        setIsError(true);
      }
    }

    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setPage(0);
    setRefreshing(true);
    setIsError(false);
    setIsLastPage(false);
    fetchReservations(0);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    onRefresh();
  }, [shouldRefresh]);

  const fetchNextPage = () => {
    if (isLastPage) {
      return;
    }
    fetchReservations(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchReservations(page);
  }, [status]);

  const ListFooter = () => {
    if (!(reservations.length > 0) && loading) {
      return <ActivityIndicator animating={loading} size="large" />;
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}>
        <SegmentedButtons
          value={status}
          onValueChange={(newStatus: ReservationStatus) => setStatus(newStatus)}
          buttons={[
            {
              value: "active",
              label: translations.ACTIVE[settings.language],
            },
            {
              value: "passed",
              label: translations.PASSED[settings.language],
            },
            {
              value: "cancelled",
              label: translations.CANCELLED[settings.language],
            },
          ]}
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
            {translations.ERROR_WHILE_FETCHING_RESOURCES[settings.language]}
          </Text>
        </RefreshControl>
      ) : loading ? (
        <ActivityIndicator animating={loading} size="large" />
      ) : reservations.length > 0 ? (
        <FlatList
          data={reservations}
          renderItem={({ item }) => (
            <ReservationListItem route={route} navigation={navigation} reservation={item} />
          )}
          keyExtractor={(reservation: Reservation) => reservation.reservationId.toString()}
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
            {translations.NO_RESERVATIONS_FOUND[settings.language]}
          </Text>
        </RefreshControl>
      )}
    </View>
  );
};

export default ReservationList;
