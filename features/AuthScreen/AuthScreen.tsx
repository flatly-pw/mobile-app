import { useState } from "react";

import SignInScreen from "./SignInScreen/SignInScreen";
import SignUpScreen from "./SignUpScreen/SignUpScreen";

export type ScreenType = "signIn" | "signUp";

const AuthScreen = () => {
  const [screen, setScreen] = useState<ScreenType>("signIn");

  const screenHandler = (newScreen: ScreenType) => {
    setScreen(newScreen);
  };

  return screen === "signIn" ? (
    <SignInScreen screenHandler={screenHandler} />
  ) : (
    <SignUpScreen screenHandler={screenHandler} />
  );
};

export default AuthScreen;
