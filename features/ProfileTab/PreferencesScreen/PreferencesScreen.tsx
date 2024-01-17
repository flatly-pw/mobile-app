import { useContext } from "react";

import CurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown/LanguageDropdown";
import UnitsDropdown from "./UnitsDropdown/UnitsDropdown";
import SettingsContext from "../../../contexts/SettingsContext";
import translations from "../../../translations/translations";
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
  const { settings } = useContext(SettingsContext);

  return (
    <SectionScreen
      route={route}
      navigation={navigation}
      bottomTabsRoute={bottomTabsRoute}
      bottomTabsNavigation={bottomTabsNavigation}
      label={translations.PREFERENCES[settings.language]}>
      <CurrencyDropdown />
      <UnitsDropdown />
      <LanguageDropdown />
    </SectionScreen>
  );
};

export default PreferencesScreen;
