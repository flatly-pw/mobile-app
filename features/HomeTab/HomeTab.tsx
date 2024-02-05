import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Text } from "react-native";

import AdvancedFilter from "./AdvancedFilter/AdvancedFilter";
import BasicFilter from "./BasicFilter/BasicFilter";
import FlatOffer from "./FlatOffer/FlatOffer";
import FlatOfferList from "./FlatOfferList/FlatOfferList";
import PaymentPanel from "./PaymentPanel/PaymentPanel";
import ReservationPanel from "./ReservationPanel/ReservationPanel";
import SafeAreaScreenWrapper from "../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import FiltersContext from "../../contexts/FiltersContext";
import Filters from "../../interfaces/Filters";

interface HomeTabProps {
  route: any;
  navigation: any;
}

const HomeTab = ({ route, navigation }: HomeTabProps) => {
  const Stack = createStackNavigator();

  const [filters, setFilters] = useState<Filters>();

  const value = { filters, setFilters };

  useEffect(() => {
    setFilters({
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      adults: 0,
      children: 0,
      pets: 0,
      typeOfPlace: 0,
      minPrice: 40,
      maxPrice: 60,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      rating: 0,
      accomodationType: 0,
      amenities: [],
    });
  }, []);

  return (
    <FiltersContext.Provider value={value}>
      <Stack.Navigator initialRouteName="FlatOfferList" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="FlatOfferList"
          children={(props) => (
            <SafeAreaScreenWrapper>
              <FlatOfferList {...props} />
            </SafeAreaScreenWrapper>
          )}
        />
        <Stack.Screen
          name="FlatOffer"
          children={(props) => (
            <SafeAreaScreenWrapper>
              <FlatOffer
                {...props}
                bottomTabsRoute={route}
                bottomTabsNavigation={navigation}
                filters={filters}
              />
            </SafeAreaScreenWrapper>
          )}
        />
        <Stack.Screen
          name="ReservationPanel"
          children={(props) => (
            <SafeAreaScreenWrapper>
              <ReservationPanel {...props} filters={filters} />
            </SafeAreaScreenWrapper>
          )}
        />
        <Stack.Screen
          name="PaymentPanel"
          children={(props) => (
            <SafeAreaScreenWrapper>
              <PaymentPanel {...props} />
            </SafeAreaScreenWrapper>
          )}
        />
        <Stack.Screen
          name="BasicFilter"
          children={(props) => (
            <SafeAreaScreenWrapper>
              <BasicFilter {...props} bottomTabsRoute={route} bottomTabsNavigation={navigation} />
            </SafeAreaScreenWrapper>
          )}
        />
        <Stack.Screen
          name="AdvancedFilter"
          children={(props) => (
            <SafeAreaScreenWrapper>
              <AdvancedFilter
                {...props}
                bottomTabsRoute={route}
                bottomTabsNavigation={navigation}
              />
            </SafeAreaScreenWrapper>
          )}
        />
      </Stack.Navigator>
    </FiltersContext.Provider>
  );
};

export default HomeTab;
