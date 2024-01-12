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

const BasicFilter = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
}: BasicFilterProps) => {
  const [startingDay, setStartingDay] = useState<DateData | null>(null);
  const [endingDay, setEndingDay] = useState<DateData | null>(null);
  const [search, setSearch] = useState("");
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

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "column",
        height: "100%",
      }}>
      <Header navigation={navigation} />
      <Filter
        startingDay={startingDay}
        startingDayHandler={startingDayHandler}
        endingDay={endingDay}
        endingDayHandler={endingDayHandler}
        search={search}
        searchHandler={searchHandler}
        companions={companions}
        companionsHandler={companionsHandler}
      />
      <Footer navigation={navigation} clearHandler={clearHandler} />
    </View>
  );
};

export default BasicFilter;
