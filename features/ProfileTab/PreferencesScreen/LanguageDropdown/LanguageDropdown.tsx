import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Surface, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import Language from "../../../../types/Language";

const data: {
  label: string;
  value: Language;
}[] = [
  { label: "English (US)", value: "en-US" },
  { label: "Polski", value: "pl-PL" },
];

const LanguageDropdown = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [language, setLanguage] = useState(settings.language);

  return (
    <Surface style={{ padding: 10, margin: 20, borderRadius: 10 }}>
      <Text>{translations.LANGUAGE[settings.language]}</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setSettings({ ...settings, language: item.value });
          setLanguage(item.value);
        }}
        value={language}
      />
    </Surface>
  );
};

export default LanguageDropdown;
