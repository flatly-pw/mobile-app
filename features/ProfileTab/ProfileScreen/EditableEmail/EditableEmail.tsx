import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";

const EditableEmail = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [isEditable, setIsEditable] = useState(false);
  const [email, setEmail] = useState(settings.email);

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
          <TextInput label="Email" value={email} onChangeText={(newEmail) => setEmail(newEmail)} />
        ) : (
          <>
            <Text variant="headlineSmall">Email</Text>
            <Text variant="titleMedium">{settings.email}</Text>
          </>
        )}
      </View>
      {isEditable ? (
        <View>
          <Button
            icon="lead-pencil"
            onPress={() => {
              setSettings({ ...settings, email });
              setIsEditable(false);
            }}>
            Apply
          </Button>
          <Button icon="cancel" onPress={() => setIsEditable(false)}>
            Cancel
          </Button>
        </View>
      ) : (
        <Button icon="account-edit-outline" onPress={() => setIsEditable(true)}>
          Edit
        </Button>
      )}
    </Surface>
  );
};

export default EditableEmail;
