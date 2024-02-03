import { Octicons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
import { useContext, useEffect } from "react";
import { View } from "react-native";
// import { DateData } from "react-native-calendars";
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

  return (
    <View style={{ height: "100%" }}>
      <Header navigation={navigation} name={flatOffer.name} />
      <ScrollView>
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
                {flatOffer.rating.toFixed(2)} ({Math.floor(Math.random() * 20 + 5)}{" "}
                {translations.RATINGS[settings.language]})
              </Text>
            </View>
          </View>
          <Gallery imageSource={flatOffer.imageSource} />
          <BasicDetails />
          <Description />
          <Accordion title={translations.FACILITIES[settings.language]} contents={<Amenities />} />
          <Map />
          <Accordion title={translations.REVIEWS[settings.language]} contents={<Reviews />} />
          <Owner />
        </View>
      </ScrollView>
      <Footer navigation={navigation} price={flatOffer.price} />
    </View>
  );
};

export default FlatOffer;