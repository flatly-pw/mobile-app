import React from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../../contexts/AuthContext";
import { ScreenType } from "../AuthScreen";

interface SignInScreenProps {
  screenHandler: (newScreen: ScreenType) => void;
}

const SignInScreen = ({ screenHandler }: SignInScreenProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaScreenWrapper>
      <View>
        <Text>Please login</Text>
        <TextInput label="email" value={email} onChangeText={(newEmail) => setEmail(newEmail)} />
        <TextInput
          label="password"
          value={password}
          onChangeText={(newPassword) => setPassword(newPassword)}
          secureTextEntry
        />
        <Button onPress={() => signIn({ email, password })}>Login</Button>
        <Button onPress={() => screenHandler("signUp")}>Go to sign up page</Button>
      </View>
    </SafeAreaScreenWrapper>
  );
};

export default SignInScreen;
