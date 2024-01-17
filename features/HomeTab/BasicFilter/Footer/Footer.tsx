import { useContext } from "react";
import { View } from "react-native";
import { useTheme, Button } from "react-native-paper";

import FiltersContext from "../../../../contexts/FiltersContext";
import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import { CompanionType } from "../BasicFilter";

interface HeaderProp {
  navigation: any;
  clearHandler: () => void;
  isSearching: boolean;
  startingDay: string;
  endingDay: string;
  search: string;
  companions: { [key in CompanionType]: number };
}

const Footer = ({
  navigation,
  clearHandler,
  isSearching,
  startingDay,
  endingDay,
  search,
  companions,
}: HeaderProp) => {
  const { settings } = useContext(SettingsContext);

  const theme = useTheme();

  const { filters, setFilters } = useContext(FiltersContext);

  const updateFilters = () => {
    let city = "";
    let country = "";

    if (search.split(",").length === 1) {
      country = search;
    } else {
      [city, country] = search.split(",").map((name) => name.trim());
    }

    setFilters({
      ...filters,
      startDate: startingDay,
      endDate: endingDay,
      city,
      country,
      adults: companions.adults,
      children: companions.children,
      pets: companions.pets,
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
        display: isSearching ? "none" : "flex",
      }}>
      <Button
        style={{ flex: 1, alignItems: "flex-start" }}
        labelStyle={theme.fonts.titleLarge}
        onPress={clearHandler}>
        {translations.CLEAR_ALL[settings.language]}
      </Button>
      <Button
        style={{ alignItems: "flex-end" }}
        mode="outlined"
        labelStyle={theme.fonts.titleLarge}
        onPress={() => {
          updateFilters();
          navigation.navigate("FlatOfferList");
        }}
        icon="magnify">
        {translations.SEARCH[settings.language]}
      </Button>
    </View>
  );
};

export default Footer;
