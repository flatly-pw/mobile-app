import CurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdown";
import UnitsDropdown from "./UnitsDropdown/UnitsDropdown";
import SectionScreen from "../SectionScreen/SectionScreen";

interface PreferencesScreenProps {
  route: any;
  navigation: any;
  bottomTabsRoute: any;
  bottomTabsNavigation: any;
}

const PreferencesScreen = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
}: PreferencesScreenProps) => {
  return (
    <SectionScreen
      route={route}
      navigation={navigation}
      bottomTabsRoute={bottomTabsRoute}
      bottomTabsNavigation={bottomTabsNavigation}
      label="Preferences">
      <CurrencyDropdown />
      <UnitsDropdown />
      <LanguageDropdown />
    </SectionScreen>
  );
};

export default PreferencesScreen;
