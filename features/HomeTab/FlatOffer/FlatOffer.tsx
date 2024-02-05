import { Octicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

import Accordion from "./Accordion/Accordion";
import Amenities from "./Amenities/Amenities";
import BasicDetails from "./BasicDetails/BasicDetails";
import Description from "./Description/Description";
import Footer from "./Footer/Footer";
import Gallery from "./Gallery/Gallery";
import Header from "./Header/Header";
import Map from "./Map/Map";
import Owner from "./Owner/owner";
import Reviews from "./Reviews/Reviews";
import SettingsContext from "../../../contexts/SettingsContext";
import FlatOfferData from "../../../interfaces/FlatOfferData";
import ReservationData from "../../../interfaces/ReservationData";
import Review from "../../../interfaces/Review";
import translations from "../../../preferences/translations";

export type CompanionType = "adults" | "children" | "pets";

const FlatOffer = ({ route, navigation, bottomTabsRoute, bottomTabsNavigation, filters }) => {
  const { flatOffer } = route.params;
  const { settings } = useContext(SettingsContext);
  useEffect(() => {
    bottomTabsNavigation.setOptions({ tabBarStyle: { display: "none" } });

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      bottomTabsNavigation.setOptions({ tabBarStyle: { display: "flex" } });
      navigation.navigate("FlatOfferList");
    });
  }, [bottomTabsNavigation, navigation]);

  const isEndDate = filters.endDate !== "";
  const startDate = isEndDate ? new Date(filters.startDate) : new Date();
  const endDate = isEndDate ? new Date(filters.endDate) : new Date(startDate);
  if (!isEndDate) endDate.setDate(endDate.getDate() + 1);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Will be used to calculate the total price

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [flatOfferData, setFlatOfferData] = useState<FlatOfferData>();
  const [reservationData, setReservationData] = useState<ReservationData>();

  const setDataFromFetch = (data: any) => {
    try {
      const fetchedArea = data.area;
      const fetchedCapacity = data.capacity;
      const fetchedBathrooms = data.bathrooms;
      const fetchedBedrooms = data.bedrooms;
      const fetchedStreet = data.address.street;
      const fetchedPostalCode = data.address.postalCode;
      const fetchedCity = data.address.city;
      const fetchedCountry = data.address.country;
      const fetchedLatitude = data.address.latitude;
      const fetchedLongitude = data.address.longitude;
      const fetchedDescription = data.description;
      const fetchedFacilities = data.facilities;
      const fetchedTopReviews = data.topReviews as Review[];
      const fetchedGallery = data.gallery;
      const fetchedOwnerName = data.owner.name;
      const fetchedOwnerLastName = data.owner.lastName;
      const fetchedOwnerEmail = data.owner.email;
      const fetchedOwnerPhoneNumber = data.owner.phoneNumber;
      const fetchedOwnerRegisteredSince = data.owner.registeredSince;
      const fetchedNumberOfReviews = data.numberOfReviews;
      setFlatOfferData({
        area: fetchedArea,
        capacity: fetchedCapacity,
        bathrooms: fetchedBathrooms,
        bedrooms: fetchedBedrooms,
        street: fetchedStreet,
        postalCode: fetchedPostalCode,
        city: fetchedCity,
        country: fetchedCountry,
        latitude: fetchedLatitude,
        longitude: fetchedLongitude,
        description: fetchedDescription,
        facilities: fetchedFacilities,
        reviews: fetchedTopReviews,
        gallery: fetchedGallery,
        ownerName: fetchedOwnerName,
        ownerLastName: fetchedOwnerLastName,
        ownerEmail: fetchedOwnerEmail,
        ownerPhoneNumber: fetchedOwnerPhoneNumber,
        ownerRegisteredSince: fetchedOwnerRegisteredSince,
        numberOfReviews: fetchedNumberOfReviews,
      });
      setReservationData({
        street: fetchedStreet,
        postalCode: fetchedPostalCode,
        city: fetchedCity,
        country: fetchedCountry,
        startDate: startDate,
        endDate: endDate,
        nightsCount: daysDifference,
        adults: filters.adults === 0 ? 1 : filters.adults,
        children: filters.children,
        pets: filters.pets,
        price: flatOffer.price,
        flatId: flatOffer.id,
        specialRequests: "",
      });
    } catch (e) {
      setIsError(true);
      console.error(e);
    }
  };

  const fetchFlat = async () => {
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

    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/flats/" + flatOffer.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setDataFromFetch(data);
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
    fetchFlat();
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <Header navigation={navigation} name={flatOffer.name} />
      <ScrollView>
        {flatOfferData && reservationData ? ( // Check if flatOfferData is defined
          <View
            style={{
              width: "95%",
              padding: 5,
              paddingLeft: 20,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 20 }}>{translations.GALLERY[settings.language]}</Text>
              <View style={{ flexDirection: "row", marginLeft: 130 }}>
                <Octicons name="star-fill" size={24} color="black" />
                <Text
                  style={{
                    padding: 5,
                  }}>
                  {flatOffer.rating.toFixed(2)} ({flatOfferData.numberOfReviews}{" "}
                  {translations.RATINGS[settings.language]})
                </Text>
              </View>
            </View>
            <Text>{reservationData.flatId}1</Text>
            <Gallery imageSource={flatOfferData.gallery} />
            <BasicDetails data={flatOfferData} />
            <Description data={flatOfferData} />
            <Accordion
              title={translations.FACILITIES[settings.language]}
              contents={<Amenities data={flatOfferData} />}
            />
            <Map data={flatOfferData} />
            <Accordion
              title={translations.REVIEWS[settings.language]}
              contents={<Reviews data={flatOfferData} />}
            />
            <Owner data={flatOfferData} />
          </View>
        ) : (
          // While not loaded
          <Text>Loading...</Text>
        )}
      </ScrollView>
      {flatOfferData && reservationData && (
        <Footer navigation={navigation} price={flatOffer.price} data={reservationData} />
      )}
    </View>
  );
};

export default FlatOffer;
