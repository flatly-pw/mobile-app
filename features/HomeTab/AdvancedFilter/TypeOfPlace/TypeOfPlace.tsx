import { useContext } from "react";
import { SegmentedButtons } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import { ButtonsType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface TypeOfPlaceProps {
  typeOfPlace: string;
  typeOfPlaceHandler: (newValue: string) => void;
  typeOfPlaceButtons: ButtonsType;
}

const TypeOfPlace = ({ typeOfPlace, typeOfPlaceHandler, typeOfPlaceButtons }: TypeOfPlaceProps) => {
  const { settings } = useContext(SettingsContext);

  return (
    <FilterItem title={translations.TYPE_OF_PLACE[settings.language]}>
      <SegmentedButtons
        value={typeOfPlace}
        onValueChange={(newValue: string) => typeOfPlaceHandler(newValue)}
        buttons={typeOfPlaceButtons}
      />
    </FilterItem>
  );
};

export default TypeOfPlace;
