import React from "react";

import UserSettings from "../interfaces/UserSettings";

const SettingsContext = React.createContext<{
  settings: UserSettings;
  setSettings: (newSettings: UserSettings) => void;
}>(null);

export default SettingsContext;
