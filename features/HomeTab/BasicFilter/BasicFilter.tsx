import { useEffect, useState } from "react";
import { View } from "react-native";
import { DateData } from "react-native-calendars";

import Filter from "./Filter/Filter";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

interface BasicFilterProps {
  route: any;
  navigation: any;
  bottomTabsRoute: any;
  bottomTabsNavigation: any;
}

export type CompanionType = "adults" | "children" | "pets";

const defaultCompanions = {
  adults: 0,
  children: 0,
  pets: 0,
};

export type DestinationType = {
  id: number;
  city: string;
  country: string;
};

const defaultDestinations: DestinationType[] = [
  {
    id: 0,
    city: "Paris",
    country: "France",
  },
  {
    id: 1,
    city: "Prague",
    country: "Czechia",
  },
  {
    id: 2,
    city: "Poznań",
    country: "France",
  },
  {
    id: 3,
    city: "",
    country: "Poland",
  },
  {
    id: 4,
    city: "Porto",
    country: "Portugal",
  },
];

const BasicFilter = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
}: BasicFilterProps) => {
  const [startingDay, setStartingDay] = useState<DateData | null>(null);
  const [endingDay, setEndingDay] = useState<DateData | null>(null);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [destinations, setDestinations] = useState(defaultDestinations);
  const [companions, setCompanions] = useState(defaultCompanions);

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
    setSearch("");
    setStartingDay(null);
    setEndingDay(null);
    setCompanions(defaultCompanions);
  };

  const startingDayHandler = (newStartingDay: DateData | null) => {
    setStartingDay(newStartingDay);
  };

  const endingDayHandler = (newEndingDay: DateData | null) => {
    setEndingDay(newEndingDay);
  };

  const searchHandler = (newSearch: string) => {
    setSearch(newSearch);
  };

  const companionsHandler = (companion: CompanionType, numberOfCompanions: number) => {
    setCompanions({ ...companions, [companion]: numberOfCompanions });
  };

  const isSearchingHandler = (newIsSearching: boolean) => {
    setIsSearching(newIsSearching);
  };

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "column",
        height: "100%",
      }}>
      <Header
        navigation={navigation}
        isSearching={isSearching}
        isSearchingHandler={isSearchingHandler}
      />
      <Filter
        startingDay={startingDay}
        startingDayHandler={startingDayHandler}
        endingDay={endingDay}
        endingDayHandler={endingDayHandler}
        search={search}
        searchHandler={searchHandler}
        companions={companions}
        companionsHandler={companionsHandler}
        isSearching={isSearching}
        isSearchingHandler={isSearchingHandler}
        destinations={destinations}
      />
      <Footer navigation={navigation} clearHandler={clearHandler} isSearching={isSearching} />
    </View>
  );
};

export default BasicFilter;
