import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const EditableName = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(settings.name);
  const [lastName, setLastName] = useState(settings.lastName);

  return (
    <Surface
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
      }}>
      <View style={{ padding: 10, flex: 1 }}>
        {isEditable ? (
          <>
            <TextInput
              label={translations.NAME[settings.language]}
              value={name}
              onChangeText={(newName) => setName(newName)}
            />
            <TextInput
              label={translations.LAST_NAME[settings.language]}
              value={lastName}
              onChangeText={(newLastName) => setLastName(newLastName)}
            />
          </>
        ) : (
          <>
            <Text variant="headlineSmall">{translations.LEGAL_NAME[settings.language]}</Text>
            <Text variant="titleMedium">
              {settings.name} {settings.lastName}
            </Text>
          </>
        )}
      </View>
      {isEditable ? (
        <View>
          <Button
            icon="lead-pencil"
            onPress={() => {
              setSettings({ ...settings, name, lastName });
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

export default EditableName;
