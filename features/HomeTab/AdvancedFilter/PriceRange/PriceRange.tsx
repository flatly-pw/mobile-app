import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { View, useWindowDimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { SliderValueType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface PriceRangeProps {
  sliderValue: SliderValueType;
  sliderValueHandler: (newValue: SliderValueType) => void;
}

const PriceRange = ({ sliderValue, sliderValueHandler }: PriceRangeProps) => {
  const theme = useTheme();

  return (
    <FilterItem title="Price range" description="per night">
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
        min={20}
        max={100}
        sliderLength={useWindowDimensions().width - 40}
      />
      <View
        style={{
          flexDirection: "row",
        }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Minimum</Text>
          <Text>${sliderValue.start}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Maximum</Text>
          <Text>${sliderValue.end}</Text>
        </View>
      </View>
    </FilterItem>
  );
};

export default PriceRange;
