import { ListItem } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { Icon, Searchbar, useTheme } from "react-native-paper";

import FilterItem from "./FilterItem/FilterItem";
import { CompanionType, DestinationType } from "../BasicFilter";
import Companion from "../Companion/Companion";

interface FilterProps {
  startingDay: string;
  startingDayHandler: (newStartingDay: string) => void;
  endingDay: string;
  endingDayHandler: (newEndingDay: string) => void;
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
  const theme = useTheme();

  const calendarOnPressHandler = (day: DateData) => {
    if (startingDay === "") {
      startingDayHandler(day.dateString);
    } else {
      if (endingDay === "") {
        if (startingDay >= day.dateString) {
          startingDayHandler(day.dateString);
        } else {
          endingDayHandler(day.dateString);
        }
      } else {
        startingDayHandler(day.dateString);
        endingDayHandler("");
      }
    }
  };

  const calendarGenerateMarkedDays = () => {
    if (startingDay === "") return;

    const dates = {};
    for (
      let timestamp = new Date(startingDay).getTime();
      timestamp <= new Date(endingDay.length > 0 ? endingDay : startingDay).getTime();
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
        startingDay: dateString === startingDay,
        endingDay: dateString === (endingDay.length > 0 ? endingDay : startingDay),
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
      <FilterItem label="Where to?">
        <Searchbar
          value={search}
          placeholder="Search destinations"
          onChangeText={(newSearch) => {
            searchHandler(newSearch);
          }}
          onFocus={() => {
            isSearchingHandler(true);
          }}
          showSoftInputOnFocus={false}
        />
      </FilterItem>
      <FilterItem label="When?">
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
      <FilterItem label="Who?">
        <Companion
          name="Adults"
          description="Ages 13 or above"
          value={companions.adults}
          valueHandler={(newValue) => companionsHandler("adults", newValue)}
        />
        <Companion
          name="Children"
          description="Under 13"
          value={companions.children}
          valueHandler={(newValue) => companionsHandler("children", newValue)}
        />
        <Companion
          name="Pets"
          description="Some exotic animals may not be allowed"
          value={companions.pets}
          valueHandler={(newValue) => companionsHandler("pets", newValue)}
        />
      </FilterItem>
    </ScrollView>
  );
};

export default Filter;
