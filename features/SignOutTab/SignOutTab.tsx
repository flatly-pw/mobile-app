import React from "react";
import { Button } from "react-native-paper";

import SafeAreaScreenWrapper from "../../components/SafeAreaScreenWrapper/SafeAreaScreenWrapper";
import AuthContext from "../../contexts/AuthContext";

const SignOutTab = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaScreenWrapper>
      <Button onPress={() => signOut()}>SignOut</Button>
    </SafeAreaScreenWrapper>
  );
};

export default SignOutTab;
