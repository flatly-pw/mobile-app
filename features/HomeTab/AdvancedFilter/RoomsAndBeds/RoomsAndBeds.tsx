import { useContext } from "react";

import RoomsAndBedsItem from "./RoomsAndBedsItem/RoomsAndBedsItem";
import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../preferences/translations";
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
  const { settings } = useContext(SettingsContext);

  return (
    <FilterItem title={translations.ROOMS_AND_BEDS[settings.language]}>
      <RoomsAndBedsItem
        label={translations.BEDROOMS[settings.language]}
        value={bedrooms}
        valueHandler={bedroomsHandler}
        buttons={roomsAndBedsButtons}
      />
      <RoomsAndBedsItem
        label={translations.BEDS[settings.language]}
        value={beds}
        valueHandler={bedsHandler}
        buttons={roomsAndBedsButtons}
      />
      <RoomsAndBedsItem
        label={translations.BATHROOMS[settings.language]}
        value={bathrooms}
        valueHandler={bathroomsHandler}
        buttons={roomsAndBedsButtons}
      />
    </FilterItem>
  );
};

export default RoomsAndBeds;
