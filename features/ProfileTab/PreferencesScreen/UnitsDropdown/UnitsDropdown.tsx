import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Surface, Text } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../translations/translations";
import MeasurementSystem from "../../../../types/MeasurementSystem";

const UnitsDropdown = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [units, setUnits] = useState(settings.units);

  const data: {
    label: string;
    value: MeasurementSystem;
  }[] = [
    { label: translations.METRIC_METER_KILOGRAM[settings.language], value: "metric" },
    { label: translations.IMPERIAL_INCH_POUND[settings.language], value: "imperial" },
  ];

  return (
    <Surface style={{ padding: 10, margin: 20, borderRadius: 10 }}>
      <Text>{translations.MEASUREMENT_SYSTEM[settings.language]}</Text>
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
