import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Surface, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import MeasurementSystem from "../../../../types/MeasurementSystem";

const data: {
  label: string;
  value: MeasurementSystem;
}[] = [
  { label: "Metric (meter, kilogram)", value: "metric" },
  { label: "Imperial (inch, pound)", value: "imperial" },
];

const UnitsDropdown = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [units, setUnits] = useState(settings.units);

  return (
    <Surface style={{ padding: 10, margin: 20, borderRadius: 10 }}>
      <Text>Measurement system</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setSettings({ ...settings, units: item.value });
          setUnits(item.value);
        }}
        value={units}
      />
    </Surface>
  );
};

export default UnitsDropdown;
