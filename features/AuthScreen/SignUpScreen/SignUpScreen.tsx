import { useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { Button, HelperText, Text, useTheme } from "react-native-paper";

import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../../contexts/AuthContext";
import { ScreenType } from "../AuthScreen";
import CustomTextInput from "../CustomTextInput";

interface SignUpScreenProps {
  screenHandler: (newScreen: ScreenType) => void;
}
const SignUpScreen = ({ screenHandler }: SignUpScreenProps) => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const { signUp } = useContext(AuthContext);

  const nameHandler = (newName: string) => {
    setName(newName);
  };

  const nameErrorVisible = () => {
    return !(name.length > 0);
  };

  const nameErrorText = () => {
    return "Name cannot be empty";
  };

  const lastNameHandler = (newLastName: string) => {
    setLastName(newLastName);
  };

  const lastNameErrorVisible = () => {
    return !(lastName.length > 0);
  };

  const lastNameErrorText = () => {
    return "Last Name cannot be empty";
  };

  const emailHandler = (newEmail: string) => {
    setEmail(newEmail);
  };

  const emailErrorVisible = () => {
    return !email.includes("@");
  };

  const emailErrorText = () => {
    return "Invalid email address";
  };

  const passwordHandler = (newPassword: string) => {
    setPassword(newPassword);
  };

  const passwordErrorVisible = () => {
    return !(password.length >= 8 && password.length <= 32);
  };

  const passwordErrorText = () => {
    return "Password should have between 8 and 32 characters";
  };

  return (
    <SafeAreaScreenWrapper>
      <View
        style={{
          justifyContent: "center",
          height: "100%",
          padding: 30,
        }}>
        <Text
          variant="displaySmall"
          style={{
            textAlign: "center",
            color: theme.colors.primary,
            fontWeight: "bold",
            marginBottom: 20,
          }}>
          Create Account
        </Text>
        <CustomTextInput
          label="Name"
          value={name}
          valueHandler={nameHandler}
          errorVisible={nameErrorVisible}
          errorText={nameErrorText}
          displayErrors={displayErrors}
        />
        <CustomTextInput
          label="Last Name"
          value={lastName}
          valueHandler={lastNameHandler}
          errorVisible={lastNameErrorVisible}
          errorText={lastNameErrorText}
          displayErrors={displayErrors}
        />
        <CustomTextInput
          label="Email"
          value={email}
          valueHandler={emailHandler}
          errorVisible={emailErrorVisible}
          errorText={emailErrorText}
          displayErrors={displayErrors}
        />
        <CustomTextInput
          label="Password"
          value={password}
          valueHandler={passwordHandler}
          errorVisible={passwordErrorVisible}
          errorText={passwordErrorText}
          displayErrors={displayErrors}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={{
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={async () => {
            setDisplayErrors(true);
            if (!emailErrorVisible() && !passwordErrorVisible()) {
              const response = await signUp({ name, lastName, email, password });
              if (!response.valueOf()) {
                setInvalidCredentials(true);
              }
            }
          }}>
          SIGN UP
        </Button>
        <HelperText type="error" visible={invalidCredentials}>
          Email address already in use.
        </HelperText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
          }}>
          <Text>Already have an account? </Text>
          <Pressable onPress={() => screenHandler("signIn")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaScreenWrapper>
  );
};

export default SignUpScreen;
