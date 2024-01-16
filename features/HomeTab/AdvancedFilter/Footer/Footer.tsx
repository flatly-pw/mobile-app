import { useContext } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import FiltersContext from "../../../../contexts/FiltersContext";
import { AmenitiesType, SliderValueType } from "../AdvancedFilter";

interface FooterProps {
  navigation: any;
  clearHandler: () => void;
  typeOfPlace: string;
  sliderValue: SliderValueType;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  rating: string;
  accomodation: string;
  amenities: AmenitiesType[];
}

const Footer = ({
  navigation,
  clearHandler,
  typeOfPlace,
  sliderValue,
  bedrooms,
  beds,
  bathrooms,
  rating,
  accomodation,
  amenities,
}: FooterProps) => {
  const theme = useTheme();

  const { filters, setFilters } = useContext(FiltersContext);

  const updateFilters = () => {
    const amenitiesIds = [];

    amenities.map((amenity) => {
      if (amenity.checked) {
        amenitiesIds.push(amenity.id);
      }
    });

    setFilters({
      ...filters,
      typeOfPlace: +typeOfPlace,
      minPrice: sliderValue.start,
      maxPrice: sliderValue.end,
      bedrooms: +bedrooms,
      beds: +beds,
      bathrooms: +bathrooms,
      rating: +rating,
      accomodationType: +accomodation,
      amenities: amenitiesIds,
    });
  };

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: theme.colors.backdrop,
        marginTop: 10,
        padding: 10,
      }}>
      <Button
        style={{ flex: 1, alignItems: "flex-start" }}
        labelStyle={theme.fonts.titleLarge}
        onPress={clearHandler}>
        Clear all
      </Button>
      <Button
        style={{ alignItems: "flex-end" }}
        mode="outlined"
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {
          updateFilters();
          navigation.navigate("FlatOfferList");
        }}>
        Show flats
      </Button>
    </View>
  );
};

export default Footer;
