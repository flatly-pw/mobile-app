import { useContext } from "react";
import { SegmentedButtons } from "react-native-paper";

import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
import { ButtonsType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface RatingProps {
  rating: string;
  ratingHandler: (newValue: string) => void;
  ratingButtons: ButtonsType;
}

const Rating = ({ rating, ratingHandler, ratingButtons }: RatingProps) => {
  const { settings } = useContext(SettingsContext);

  return (
    <FilterItem title={translations.RATING[settings.language]}>
      <SegmentedButtons
        value={rating}
        onValueChange={(newValue: string) => ratingHandler(newValue)}
        buttons={ratingButtons}
      />
    </FilterItem>
  );
};

export default Rating;
