import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import AdvancedFilter from "./AdvancedFilter/AdvancedFilter";
import BasicFilter from "./BasicFilter/BasicFilter";
import FlatOfferList from "./FlatOfferList/FlatOfferList";
import SafeAreaScreenWrapper from "../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";

interface HomeTabProps {
  route: any;
  navigation: any;
}

const HomeTab = ({ route, navigation }: HomeTabProps) => {
  const Stack = createStackNavigator();

  return (
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
            {/* TODO: change this dummy text with our flat offer component,
             * remember to get flatOffer from props in the new component!
             */}
            <Text>Flat Offer...</Text>
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
        children={() => (
          <SafeAreaScreenWrapper>
            <AdvancedFilter />
          </SafeAreaScreenWrapper>
        )}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
