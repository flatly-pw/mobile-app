import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput, ActivityIndicator } from "react-native-paper";

import AuthContext from "../../../../contexts/AuthContext";
import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const EditableEmail = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { signOut } = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);
  const [email, setEmail] = useState(settings.email);

  const [isLoading, setIsLoading] = useState(false);

  const editEmail = async () => {
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

    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/user/email", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newMail: email }),
    });

    if (response.ok) {
      setSettings({ ...settings, email });
      setIsEditable(false);
      signOut();
    } else {
      console.log(
        "Problem with fetch in editEmail, status text:",
        response.statusText,
        ", status code:",
        response.status
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
        marginTop: 20,
      }}>
      <View style={{ padding: 10, flex: 1 }}>
        {isEditable ? (
          <TextInput
            label={translations.EMAIL[settings.language]}
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
          />
        ) : (
          <>
            <Text variant="headlineSmall">Email</Text>
            <Text variant="titleMedium">{settings.email}</Text>
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
              editEmail();
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

export default EditableEmail;
