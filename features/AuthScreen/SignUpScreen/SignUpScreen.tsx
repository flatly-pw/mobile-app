import React from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../../contexts/AuthContext";
import { ScreenType } from "../AuthScreen";

interface SignUpScreenProps {
  screenHandler: (newScreen: ScreenType) => void;
}
const SignUpScreen = ({ screenHandler }: SignUpScreenProps) => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signUp } = React.useContext(AuthContext);

  return (
    <SafeAreaScreenWrapper>
      <View>
        <Text>Please register</Text>
        <TextInput label="name" value={name} onChangeText={(newName) => setName(newName)} />
        <TextInput
          label="lastName"
          value={lastName}
          onChangeText={(newLastName) => setLastName(newLastName)}
        />
        <TextInput label="email" value={email} onChangeText={(newEmail) => setEmail(newEmail)} />
        <TextInput
          label="password"
          value={password}
          onChangeText={(newPassword) => setPassword(newPassword)}
          secureTextEntry
        />
        <Button onPress={() => signUp({ name, lastName, email, password })}>Register</Button>
        <Button onPress={() => screenHandler("signIn")}>Go to sign in page</Button>
      </View>
    </SafeAreaScreenWrapper>
  );
};

export default SignUpScreen;
