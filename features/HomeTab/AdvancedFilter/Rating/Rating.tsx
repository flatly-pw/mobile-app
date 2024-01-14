import { SegmentedButtons } from "react-native-paper";

import { ButtonsType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface RatingProps {
  rating: string;
  ratingHandler: (newValue: string) => void;
  ratingButtons: ButtonsType;
}

const Rating = ({ rating, ratingHandler, ratingButtons }: RatingProps) => {
  return (
    <FilterItem title="Rating">
      <SegmentedButtons
        value={rating}
        onValueChange={(newValue: string) => ratingHandler(newValue)}
        buttons={ratingButtons}
      />
    </FilterItem>
  );
};

export default Rating;
