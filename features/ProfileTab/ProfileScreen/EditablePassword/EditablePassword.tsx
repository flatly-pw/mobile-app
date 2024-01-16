import { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";

const EditablePassword = () => {
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
              label="Old Password"
              value={oldPassword}
              onChangeText={(password) => setOldPassword(password)}
              secureTextEntry
            />
            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={(password) => setNewPassword(password)}
              secureTextEntry
            />
          </>
        ) : (
          <>
            <Text variant="headlineSmall">Password</Text>
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

export default EditablePassword;
