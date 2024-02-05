import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Surface, Text, TextInput } from "react-native-paper";

import AuthContext from "../../../../contexts/AuthContext";
import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";

const EditablePassword = () => {
  const { settings } = useContext(SettingsContext);
  const { signOut } = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const editPassword = async () => {
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

    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/user/password", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: oldPassword,
        newPassword,
      }),
    });

    if (response.ok) {
      setIsEditable(false);
      signOut();
    } else {
      console.log(
        "Problem with fetch in editPassword, status text:",
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
        {isLoading ? (
          <ActivityIndicator animating={isLoading} size="large" style={{ padding: 10 }} />
        ) : isEditable ? (
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
              editPassword();
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
