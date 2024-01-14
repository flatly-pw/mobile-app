import { ScrollView } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import { ButtonsType } from "../../AdvancedFilter";

interface RoomsAndBedsItemProps {
  label: string;
  value: string;
  valueHandler: (newValue: string) => void;
  buttons: ButtonsType;
}

const RoomsAndBedsItem = ({ label, value, valueHandler, buttons }: RoomsAndBedsItemProps) => {
  return (
    <>
      <Text variant="bodyMedium">{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10, marginBottom: 10 }}>
        <SegmentedButtons
          value={value}
          onValueChange={(newValue: string) => valueHandler(newValue)}
          buttons={buttons}
        />
      </ScrollView>
    </>
  );
};

export default RoomsAndBedsItem;
