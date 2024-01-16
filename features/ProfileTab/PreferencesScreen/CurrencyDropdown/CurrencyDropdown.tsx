import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Surface, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import Currency from "../../../../types/Currency";

const data: {
  label: string;
  value: Currency;
}[] = [
  { label: "Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "Polish zloty", value: "PLN" },
];

const CurrencyDropdown = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [currency, setCurrency] = useState(settings.currency);

  return (
    <Surface style={{ padding: 10, margin: 20, borderRadius: 10 }}>
      <Text>Currency</Text>
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
