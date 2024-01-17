import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useContext } from "react";
import { View, useWindowDimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import getPriceWithCurrency from "../../../../preferences/currencies";
import translations from "../../../../preferences/translations";
import { SliderValueType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface PriceRangeProps {
  sliderValue: SliderValueType;
  sliderValueHandler: (newValue: SliderValueType) => void;
}

const minPriceRange = 20;
const maxPriceRange = 100;

const PriceRange = ({ sliderValue, sliderValueHandler }: PriceRangeProps) => {
  const { settings } = useContext(SettingsContext);

  const theme = useTheme();

  return (
    <FilterItem
      title={translations.PRICE_RANGE[settings.language]}
      description={translations.PER_NIGHT[settings.language]}>
      <MultiSlider
        values={[sliderValue.start, sliderValue.end]}
        onValuesChange={(newValues: number[]) => {
          sliderValueHandler({ start: newValues[0], end: newValues[1] });
        }}
        markerStyle={{
          backgroundColor: theme.colors.primary,
          height: 20,
          width: 20,
        }}
        selectedStyle={{ backgroundColor: theme.colors.primary }}
        allowOverlap
        min={minPriceRange}
        max={maxPriceRange}
        sliderLength={useWindowDimensions().width - 40}
      />
      <View
        style={{
          flexDirection: "row",
        }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>{translations.MINIMUM[settings.language]}</Text>
          <Text>{getPriceWithCurrency(sliderValue.start, settings.currency)}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>{translations.MAXIMUM[settings.language]}</Text>
          <Text>
            {getPriceWithCurrency(sliderValue.end, settings.currency)}
            {sliderValue.end === maxPriceRange ? "+" : ""}
          </Text>
        </View>
      </View>
    </FilterItem>
  );
};

export default PriceRange;
