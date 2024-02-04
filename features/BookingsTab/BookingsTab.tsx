import { createStackNavigator } from "@react-navigation/stack";

import ReservationDetails from "./ReservationDetails/ReservationDetails";
import ReservationList from "./ReservationList/ReservationList";
import SafeAreaScreenWrapper from "../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";

const BookingsTab = ({ route, navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ReservationList" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReservationList"
        children={(props) => (
          <SafeAreaScreenWrapper>
            <ReservationList {...props} />
          </SafeAreaScreenWrapper>
        )}
      />
      <Stack.Screen
        name="ReservationDetails"
        children={(props) => (
          <SafeAreaScreenWrapper>
            <ReservationDetails />
          </SafeAreaScreenWrapper>
        )}
      />
    </Stack.Navigator>
  );
};

export default BookingsTab;
