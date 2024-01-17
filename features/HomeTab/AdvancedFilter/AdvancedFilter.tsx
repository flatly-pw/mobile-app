import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";

import Accomodation from "./Accomodation/Accomodation";
import Amenities from "./Amenities/Amenities";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import PriceRange from "./PriceRange/PriceRange";
import Rating from "./Rating/Rating";
import RoomsAndBeds from "./RoomsAndBeds/RoomsAndBeds";
import TypeOfPlace from "./TypeOfPlace/TypeOfPlace";
import SettingsContext from "../../../contexts/SettingsContext";
import translations from "../../../translations/translations";
import FiltersContext from "../../../contexts/FiltersContext";


interface BasicFilterProps {
  route: any;
  navigation: any;
  bottomTabsRoute: any;
  bottomTabsNavigation: any;
}

export type ButtonsType = {
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
}[];

export type SliderValueType = { start: number; end: number };

export type AmenitiesType = {
  id: number;
  label: string;
  checked: boolean;
};

const AdvancedFilter = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
}: BasicFilterProps) => {
  const { settings } = useContext(SettingsContext);
  const { filters } = useContext(FiltersContext);
        
  const typeOfPlaceButtons: ButtonsType = [
    {
      value: "0",
      label: translations.ANY_TYPE[settings.language],
    },
    {
      value: "1",
      label: translations.ROOM[settings.language],
    },
    {
      value: "2",
      label: translations.ENTIRE_HOME[settings.language],
    },
  ];

  const roomsAndBedsButtons: ButtonsType = [
    { value: "0", label: translations.ANY[settings.language] },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6+" },
  ];

  const defaultSliderValue: SliderValueType = {
    start: 40,
    end: 60,
  };

  const ratingButtons: ButtonsType = [
    {
      value: "0",
      label: translations.ANY[settings.language],
    },
    {
      value: "1",
      label: "4.5+",
    },
    {
      value: "2",
      label: "3.5+",
    },
    {
      value: "3",
      label: "2.5+",
    },
  ];

  const accomodationButtons: ButtonsType = [
    {
      value: "0",
      label: translations.ANY_TYPE[settings.language],
    },
    {
      value: "1",
      label: translations.HOTEL[settings.language],
    },
    {
      value: "2",
      label: translations.FLAT[settings.language],
    },
    {
      value: "3",
      label: translations.GUEST_HOUSE[settings.language],
      style: {
        flex: 0,
      },
    },
  ];

  const defaultAmenities: AmenitiesType[] = [
    {
      id: 0,
      label: translations.WIFI[settings.language],
      checked: false,
    },
    {
      id: 1,
      label: translations.KITCHEN[settings.language],
      checked: false,
    },
    {
      id: 2,
      label: translations.TV[settings.language],
      checked: false,
    },
  ];

  const [typeOfPlace, setTypeOfPlace] = useState(filters.typeOfPlace.toString());
  const [sliderValue, setSliderValue] = useState<SliderValueType>({
    start: filters.minPrice,
    end: filters.maxPrice,
  });
  const [bedrooms, setBedrooms] = useState(filters.bedrooms.toString());
  const [beds, setBeds] = useState(filters.beds.toString());
  const [bathrooms, setBathrooms] = useState(filters.bathrooms.toString());
  const [rating, setRating] = useState(filters.rating.toString());
  const [accomodation, setAccomodation] = useState(filters.accomodationType.toString());
  const [amenities, setAmenities] = useState(
    defaultAmenities.map((amenity: AmenitiesType) => {
      return { ...amenity, checked: filters.amenities.includes(amenity.id) };
    })
  );

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

  const clearHandler = () => {
    setTypeOfPlace("0");
    setSliderValue(defaultSliderValue);
    setBedrooms("0");
    setBeds("0");
    setBathrooms("0");
    setRating("0");
    setAccomodation("0");
    setAmenities(defaultAmenities);
  };

  const typeOfPlaceHandler = (newValue: string) => {
    setTypeOfPlace(newValue);
  };

  const sliderValueHandler = (newValue: SliderValueType) => {
    setSliderValue(newValue);
  };

  const bedroomsHandler = (newValue: string) => {
    setBedrooms(newValue);
  };

  const bedsHandler = (newValue: string) => {
    setBeds(newValue);
  };

  const bathroomsHandler = (newValue: string) => {
    setBathrooms(newValue);
  };

  const ratingHandler = (newValue: string) => {
    setRating(newValue);
  };

  const accomodationHandler = (newValue: string) => {
    setAccomodation(newValue);
  };

  const amenitiesHandler = (newValue: AmenitiesType[]) => {
    setAmenities(newValue);
  };

  return (
    <View style={{ height: "100%" }}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TypeOfPlace
          typeOfPlace={typeOfPlace}
          typeOfPlaceHandler={typeOfPlaceHandler}
          typeOfPlaceButtons={typeOfPlaceButtons}
        />
        <PriceRange sliderValue={sliderValue} sliderValueHandler={sliderValueHandler} />
        <RoomsAndBeds
          bedrooms={bedrooms}
          bedroomsHandler={bedroomsHandler}
          beds={beds}
          bedsHandler={bedsHandler}
          bathrooms={bathrooms}
          bathroomsHandler={bathroomsHandler}
          roomsAndBedsButtons={roomsAndBedsButtons}
        />
        <Rating rating={rating} ratingHandler={ratingHandler} ratingButtons={ratingButtons} />
        <Accomodation
          accomodation={accomodation}
          accomodationHandler={accomodationHandler}
          accomodationButtons={accomodationButtons}
        />
        <Amenities amenities={amenities} amenitiesHandler={amenitiesHandler} />
      </ScrollView>
      <Footer
        navigation={navigation}
        clearHandler={clearHandler}
        typeOfPlace={typeOfPlace}
        sliderValue={sliderValue}
        bedrooms={bedrooms}
        beds={beds}
        bathrooms={bathrooms}
        rating={rating}
        accomodation={accomodation}
        amenities={amenities}
      />
    </View>
  );
};

export default AdvancedFilter;
