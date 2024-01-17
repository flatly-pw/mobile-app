import { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import Header from "./Header/Header";
import Section from "./Section/Section";
import SectionItem from "./SectionItem/SectionItem";
import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../../contexts/AuthContext";
import SettingsContext from "../../../contexts/SettingsContext";
import translations from "../../../translations/translations";

interface MainScreenProps {
  route: any;
  navigation: any;
}

const MainScreen = ({ route, navigation }: MainScreenProps) => {
  const { signOut } = useContext(AuthContext);
  const { settings } = useContext(SettingsContext);

  return (
    <SafeAreaScreenWrapper>
      <View style={{ padding: 20, height: "100%" }}>
        <Header />
        <View style={{ flex: 1, marginTop: 50 }}>
          <Section label={translations.PROFILE[settings.language]}>
            <SectionItem
              route={route}
              navigation={navigation}
              label={translations.MANAGE_USER[settings.language]}
              icon="record-circle-outline"
              destination="ProfileScreen"
            />
          </Section>
          <Section label={translations.SETTINGS[settings.language]}>
            <SectionItem
              route={route}
              navigation={navigation}
              label={translations.PREFERENCES[settings.language]}
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
            {translations.SIGN_OUT[settings.language]}
          </Button>
        </View>
      </View>
    </SafeAreaScreenWrapper>
  );
};

export default MainScreen;
