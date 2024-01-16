import { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import Header from "./Header/Header";
import Section from "./Section/Section";
import SectionItem from "./SectionItem/SectionItem";
import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../../contexts/AuthContext";

interface MainScreenProps {
  route: any;
  navigation: any;
}

const MainScreen = ({ route, navigation }: MainScreenProps) => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaScreenWrapper>
      <View style={{ padding: 20, height: "100%" }}>
        <Header />
        <View style={{ flex: 1, marginTop: 50 }}>
          <Section label="Profile">
            <SectionItem
              route={route}
              navigation={navigation}
              label="Manage user"
              icon="record-circle-outline"
              destination="ProfileScreen"
            />
          </Section>
          <Section label="Settings">
            <SectionItem
              route={route}
              navigation={navigation}
              label="Preferences"
              icon="cog-outline"
              destination="PreferencesScreen"
            />
          </Section>
        </View>

        <View style={{ alignItems: "center" }}>
          <Button
            onPress={() => signOut()}
            mode="elevated"
            style={{ width: "50%", borderRadius: 5 }}>
            Sign Out
          </Button>
        </View>
      </View>
    </SafeAreaScreenWrapper>
  );
};

export default MainScreen;
