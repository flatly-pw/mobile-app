import { ListItem } from "@rneui/themed";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { DateData, Calendar } from "react-native-calendars";
import { Icon, Searchbar, useTheme } from "react-native-paper";

import FilterItem from "./FilterItem/FilterItem";
import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../translations/translations";
import { CompanionType, DestinationType } from "../BasicFilter";
import Companion from "../Companion/Companion";

interface FilterProps {
  startingDay: DateData | null;
  startingDayHandler: (newStartingDay: DateData | null) => void;
  endingDay: DateData | null;
  endingDayHandler: (newEndingDay: DateData | null) => void;
  search: string;
  searchHandler: (newSearch: string) => void;
  companions: { [key in CompanionType]: number };
  companionsHandler: (companion: CompanionType, numberOfCompanions: number) => void;
  isSearching: boolean;
  isSearchingHandler: (newIsSearching: boolean) => void;
  destinations: DestinationType[];
}

const Filter = ({
  startingDay,
  startingDayHandler,
  endingDay,
  endingDayHandler,
  search,
  searchHandler,
  companions,
  companionsHandler,
  isSearching,
  isSearchingHandler,
  destinations,
}: FilterProps) => {
  const { settings } = useContext(SettingsContext);

  const theme = useTheme();

  const calendarOnPressHandler = (day: DateData) => {
    if (startingDay === null) {
      startingDayHandler(day);
    } else {
      if (endingDay == null) {
        if (startingDay.timestamp >= day.timestamp) {
          startingDayHandler(day);
        } else {
          endingDayHandler(day);
        }
      } else {
        startingDayHandler(day);
        endingDayHandler(null);
      }
    }
  };

  const calendarGenerateMarkedDays = () => {
    if (startingDay === null) return;

    const dates = {};
    for (
      let timestamp = startingDay.timestamp;
      timestamp <= (endingDay ?? startingDay).timestamp;
      timestamp += 24 * 60 * 60 * 1000 // one day in miliseconds
    ) {
      const date = new Date(timestamp);
      const year = date.getFullYear().toString();
      /* Compact trick to convert number to two-char string
       * eg. 1 -> "01", 31 -> "31",
       * See: https://stackoverflow.com/a/7254108
       */
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const dateString = `${year}-${month}-${day}`;
      dates[dateString] = {
        color: theme.colors.primaryContainer,
        startingDay: dateString === startingDay.dateString,
        endingDay: dateString === (endingDay ?? startingDay).dateString,
      };
    }

    return dates;
  };

  if (isSearching) {
    return (
      <View
        style={{
          padding: 10,
          marginTop: 10,
        }}>
        <Searchbar
          value={search}
          placeholder="Search destinations"
          onChangeText={(newSearch) => {
            searchHandler(newSearch);
          }}
          onSubmitEditing={() => {
            isSearchingHandler(false);
          }}
          autoFocus
        />
        {destinations.map((destination) => {
          const searchText =
            destination.city.length > 0
              ? `${destination.city}, ${destination.country}`
              : destination.country;
          return (
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: "transparent" }}
              onPress={() => {
                searchHandler(searchText);
                isSearchingHandler(false);
              }}
              key={destination.id}>
              <Icon source="map-marker-outline" size={32} />
              <ListItem.Content>
                <ListItem.Title>{searchText}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </View>
    );
  }

  return (
    <ScrollView>
      <FilterItem label={translations.WHERE_TO[settings.language]}>
        <Searchbar
          value={search}
          placeholder={translations.SEARCH_DESTINATIONS[settings.language]}
          onChangeText={(newSearch) => {
            searchHandler(newSearch);
          }}
          onFocus={() => {
            isSearchingHandler(true);
          }}
          showSoftInputOnFocus={false}
        />
      </FilterItem>
      <FilterItem label={translations.WHEN[settings.language]}>
        <Calendar
          onDayPress={calendarOnPressHandler}
          markingType="period"
          markedDates={calendarGenerateMarkedDays()}
          style={{
            borderRadius: 10,
          }}
          theme={{ arrowColor: theme.colors.primary }}
        />
      </FilterItem>
      <FilterItem label={translations.WHO[settings.language]}>
        <Companion
          name={translations.ADULTS[settings.language]}
          description={translations.AGES_13_OR_ABOVE[settings.language]}
          value={companions.adults}
          valueHandler={(newValue) => companionsHandler("adults", newValue)}
        />
        <Companion
          name={translations.CHILDREN[settings.language]}
          description={translations.UNDER_13[settings.language]}
          value={companions.children}
          valueHandler={(newValue) => companionsHandler("children", newValue)}
        />
        <Companion
          name={translations.PETS[settings.language]}
          description={translations.SOME_EXOTIC_ANIMALS_MAY_NOT_BE_ALLOWED[settings.language]}
          value={companions.pets}
          valueHandler={(newValue) => companionsHandler("pets", newValue)}
        />
      </FilterItem>
    </ScrollView>
  );
};

export default Filter;
