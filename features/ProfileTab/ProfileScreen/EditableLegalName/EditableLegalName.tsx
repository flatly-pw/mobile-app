import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Surface, Text, TextInput } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const EditableName = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(settings.name);
  const [lastName, setLastName] = useState(settings.lastName);

  const [isLoading, setIsLoading] = useState(false);

  const editLegalName = async () => {
    setIsLoading(true);
    let userToken: string | null;
    try {
      userToken = await SecureStore.getItemAsync("userToken");
    } catch {
      // Token was not found in the secure store. User is not authenticated.
      userToken = null;
    }

    if (!userToken) {
      return;
    }

    const responseName = await fetch(process.env.EXPO_PUBLIC_API_URL + "/user/name", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName: name }),
    });

    const responseLastName = await fetch(process.env.EXPO_PUBLIC_API_URL + "/user/lastName", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newLastName: lastName }),
    });

    if (responseName.ok && responseLastName.ok) {
      setSettings({ ...settings, name, lastName });
      setIsEditable(false);
    } else {
      console.log(
        "Problem with fetch in editLegalName, status texts:",
        responseName.statusText,
        responseLastName.statusText,
        ", status codes:",
        responseName.status,
        responseLastName.status
      );
    }

    setIsLoading(false);
  };

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
      {isLoading ? (
        <ActivityIndicator animating={isLoading} size="large" style={{ padding: 10 }} />
      ) : isEditable ? (
        <View>
          <Button
            icon="lead-pencil"
            onPress={() => {
              editLegalName();
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
