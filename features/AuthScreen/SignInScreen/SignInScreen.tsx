import { useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { Button, HelperText, Text, useTheme } from "react-native-paper";

import SafeAreaScreenWrapper from "../../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../../contexts/AuthContext";
import { ScreenType } from "../AuthScreen";
import CustomTextInput from "../CustomTextInput";

interface SignInScreenProps {
  screenHandler: (newScreen: ScreenType) => void;
}

const SignInScreen = ({ screenHandler }: SignInScreenProps) => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const { signIn } = useContext(AuthContext);

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
          Welcome back.
        </Text>
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
              const response = await signIn({ email, password });
              if (!response.valueOf()) {
                setInvalidCredentials(true);
              }
            }
          }}>
          LOGIN
        </Button>
        <HelperText type="error" visible={invalidCredentials}>
          Invalid email or password.
        </HelperText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
          }}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => screenHandler("signUp")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaScreenWrapper>
  );
};

export default SignInScreen;
