import { SegmentedButtons } from "react-native-paper";

import { ButtonsType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface TypeOfPlaceProps {
  typeOfPlace: string;
  typeOfPlaceHandler: (newValue: string) => void;
  typeOfPlaceButtons: ButtonsType;
}

const TypeOfPlace = ({ typeOfPlace, typeOfPlaceHandler, typeOfPlaceButtons }: TypeOfPlaceProps) => {
  return (
    <FilterItem title="Type of place">
      <SegmentedButtons
        value={typeOfPlace}
        onValueChange={(newValue: string) => typeOfPlaceHandler(newValue)}
        buttons={typeOfPlaceButtons}
      />
    </FilterItem>
  );
};

export default TypeOfPlace;
