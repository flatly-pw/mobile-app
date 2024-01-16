import { useContext, useState } from "react";

import SettingsContext from "../../../../contexts/SettingsContext";
import Currency from "../../../../types/Currency";

const data: {
  label: string;
  value: Currency;
}[] = [
  { label: "Dolar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "Polish zloty", value: "PLN" },
];

const Currency = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [currency, setCurrency] = useState(settings.language);

  return (
    <Surface style={{ padding: 10, margin: 20, borderRadius: 10 }}>
      <Text>Currency</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        onChange={(item) => setCurrency(item.value)}
        value={currency}
      />
    </Surface>
  );
};

export default Currency;
