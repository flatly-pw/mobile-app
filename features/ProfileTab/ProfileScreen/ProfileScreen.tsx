import EditableEmail from "./EditableEmail/EditableEmail";
import EditableName from "./EditableLegalName/EditableLegalName";
import EditablePassword from "./EditablePassword/EditablePassword";
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
  return (
    <SectionScreen
      route={route}
      navigation={navigation}
      bottomTabsRoute={bottomTabsRoute}
      bottomTabsNavigation={bottomTabsNavigation}
      label="Manage user">
      <EditableName />
      <EditableEmail />
      <EditablePassword />
    </SectionScreen>
  );
};

export default ProfileScreen;
