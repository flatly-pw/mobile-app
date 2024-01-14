import RoomsAndBedsItem from "./RoomsAndBedsItem/RoomsAndBedsItem";
import { ButtonsType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface RoomsAndBedsProps {
  bedrooms: string;
  bedroomsHandler: (newValue: string) => void;
  beds: string;
  bedsHandler: (newValue: string) => void;
  bathrooms: string;
  bathroomsHandler: (newValue: string) => void;
  roomsAndBedsButtons: ButtonsType;
}

const RoomsAndBeds = ({
  bedrooms,
  bedroomsHandler,
  beds,
  bedsHandler,
  bathrooms,
  bathroomsHandler,
  roomsAndBedsButtons,
}: RoomsAndBedsProps) => {
  return (
    <FilterItem title="Rooms and beds">
      <RoomsAndBedsItem
        label="Bedrooms"
        value={bedrooms}
        valueHandler={bedroomsHandler}
        buttons={roomsAndBedsButtons}
      />
      <RoomsAndBedsItem
        label="Beds"
        value={beds}
        valueHandler={bedsHandler}
        buttons={roomsAndBedsButtons}
      />
      <RoomsAndBedsItem
        label="Bathrooms"
        value={bathrooms}
        valueHandler={bathroomsHandler}
        buttons={roomsAndBedsButtons}
      />
    </FilterItem>
  );
};

export default RoomsAndBeds;
