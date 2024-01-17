import { useContext } from "react";

import EditableEmail from "./EditableEmail/EditableEmail";
import EditableName from "./EditableLegalName/EditableLegalName";
import EditablePassword from "./EditablePassword/EditablePassword";
import SettingsContext from "../../../contexts/SettingsContext";
import translations from "../../../translations/translations";
import SectionScreen from "../SectionScreen/SectionScreen";

interface ProfileScreenProps {
  route: any;
  navigation: any;
  bottomTabsRoute: any;
  bottomTabsNavigation: any;
}

const ProfileScreen = ({
  route,
  navigation,
  bottomTabsRoute,
  bottomTabsNavigation,
}: ProfileScreenProps) => {
  const { settings } = useContext(SettingsContext);

  return (
    <SectionScreen
      route={route}
      navigation={navigation}
      bottomTabsRoute={bottomTabsRoute}
      bottomTabsNavigation={bottomTabsNavigation}
      label={translations.MANAGE_USER[settings.language]}>
      <EditableName />
      <EditableEmail />
      <EditablePassword />
    </SectionScreen>
  );
};

export default ProfileScreen;
