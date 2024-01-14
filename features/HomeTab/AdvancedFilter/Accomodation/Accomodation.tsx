import { SegmentedButtons } from "react-native-paper";

import { ButtonsType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface AcoomodationProps {
  accomodation: string;
  accomodationHandler: (newValue: string) => void;
  accomodationButtons: ButtonsType;
}

const Accomodation = ({
  accomodation,
  accomodationHandler,
  accomodationButtons,
}: AcoomodationProps) => {
  return (
    <FilterItem title="Accomodation type">
      <SegmentedButtons
        value={accomodation}
        onValueChange={(newValue: string) => accomodationHandler(newValue)}
        buttons={accomodationButtons}
      />
    </FilterItem>
  );
};

export default Accomodation;
