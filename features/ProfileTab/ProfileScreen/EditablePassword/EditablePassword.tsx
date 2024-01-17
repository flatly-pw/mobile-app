import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const EditablePassword = () => {
  const { settings } = useContext(SettingsContext);

  const [isEditable, setIsEditable] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <Surface
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        marginTop: 20,
      }}>
      <View style={{ padding: 10, flex: 1 }}>
        {isEditable ? (
          <>
            <TextInput
              label={translations.OLD_PASSWORD[settings.language]}
              value={oldPassword}
              onChangeText={(password) => setOldPassword(password)}
              secureTextEntry
            />
            <TextInput
              label={translations.NEW_PASSWORD[settings.language]}
              value={newPassword}
              onChangeText={(password) => setNewPassword(password)}
              secureTextEntry
            />
          </>
        ) : (
          <>
            <Text variant="headlineSmall">{translations.PASSWORD[settings.language]}</Text>
            <Text variant="titleMedium">••••••••••••••</Text>
          </>
        )}
      </View>
      {isEditable ? (
        <View>
          <Button
            icon="lead-pencil"
            onPress={() => {
              setIsEditable(false);
            }}>
            {translations.APPLY[settings.language]}
          </Button>
          <Button icon="cancel" onPress={() => setIsEditable(false)}>
            {translations.CANCEL[settings.language]}
          </Button>
        </View>
      ) : (
        <Button icon="account-edit-outline" onPress={() => setIsEditable(true)}>
          {translations.EDIT[settings.language]}
        </Button>
      )}
    </Surface>
  );
};

export default EditablePassword;
