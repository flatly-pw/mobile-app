import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";

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
            <TextInput label="Name" value={name} onChangeText={(newName) => setName(newName)} />
            <TextInput
              label="Last Name"
              value={lastName}
              onChangeText={(newLastName) => setLastName(newLastName)}
            />
          </>
        ) : (
          <>
            <Text variant="headlineSmall">Legal name</Text>
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

export default EditableName;
