import React from "react";

import SignInData from "../interfaces/SignInData";
import SignUpData from "../interfaces/SignUpData";

const AuthContext = React.createContext<{
  signIn: (data: SignInData) => Promise<boolean>;
  signOut: () => void;
  signUp: (data: SignUpData) => Promise<boolean>;
}>(null);

export default AuthContext;
