import React from "react";

import SignInData from "../interfaces/SignInData";
import SignUpData from "../interfaces/SignUpData";

const AuthContext = React.createContext<{
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  signUp: (data: SignUpData) => Promise<void>;
}>(null);

export default AuthContext;
