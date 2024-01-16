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

const typeOfPlaceButtons: ButtonsType = [
  {
    value: "0",
    label: "Any type",
  },
  {
    value: "1",
    label: "Room",
  },
  {
    value: "2",
    label: "Entire home",
  },
];

const roomsAndBedsButtons: ButtonsType = [
  { value: "0", label: "Any" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6+" },
];

export type SliderValueType = { start: number; end: number };

const defaultSliderValue: SliderValueType = {
  start: 40,
  end: 60,
};

const ratingButtons: ButtonsType = [
  {
    value: "0",
    label: "Any",
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
    label: "Any type",
  },
  {
    value: "1",
    label: "Hotel",
  },
  {
    value: "2",
    label: "Flat",
  },
  {
    value: "3",
    label: "Guest house",
    style: {
      flex: 0,
    },
  },
];

export type AmenitiesType = {
  id: number;
  label: string;
  checked: boolean;
};

const defaultAmenities: AmenitiesType[] = [
  {
    id: 0,
    label: "Wifi",
    checked: false,
  },
  {
    id: 1,
    label: "Kitchen",
    checked: false,
  },
  {
    id: 2,
    label: "TV",
    checked: false,
  },
];

const AdvancedFilter = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
}: BasicFilterProps) => {
  const { filters } = useContext(FiltersContext);

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
