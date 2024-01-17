import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Surface, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import Currency from "../../../../types/Currency";

const CurrencyDropdown = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [currency, setCurrency] = useState(settings.currency);

  const data: {
    label: string;
    value: Currency;
  }[] = [
    { label: translations.US_DOLLAR[settings.language], value: "USD" },
    { label: translations.EURO[settings.language], value: "EUR" },
    { label: translations.POLISH_ZLOTY[settings.language], value: "PLN" },
  ];

  return (
    <Surface style={{ padding: 10, margin: 20, borderRadius: 10 }}>
      <Text>{translations.CURRENCY[settings.language]}</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setSettings({ ...settings, currency: item.value });
          setCurrency(item.value);
        }}
        value={currency}
      />
    </Surface>
  );
};

export default CurrencyDropdown;
