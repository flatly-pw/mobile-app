import { useContext } from "react";
import { SegmentedButtons } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
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
  const { settings } = useContext(SettingsContext);

  return (
    <FilterItem title={translations.ACCOMODATION_TYPE[settings.language]}>
      <SegmentedButtons
        value={accomodation}
        onValueChange={(newValue: string) => accomodationHandler(newValue)}
        buttons={accomodationButtons}
      />
    </FilterItem>
  );
};

export default Accomodation;
