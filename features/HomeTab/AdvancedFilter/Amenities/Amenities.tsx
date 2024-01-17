import { useContext } from "react";

import AmenitiesItem from "./AmenitiesItem/AmenitiesItem";
import SettingsContext from "../../../../contexts/SettingsContext";
import translations from "../../../../translations/translations";
import { AmenitiesType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface AmenitiesProps {
  amenities: AmenitiesType;
  amenitiesHandler: (newValue: AmenitiesType) => void;
}

const Amenities = ({ amenities, amenitiesHandler }: AmenitiesProps) => {
  const { settings } = useContext(SettingsContext);

  return (
    <FilterItem title={translations.AMENITIES[settings.language]}>
      {Object.keys(amenities).map((key: string) => {
        return (
          <AmenitiesItem
            label={amenities[key].label}
            status={amenities[key].checked}
            statusHandler={(newValue: boolean) =>
              amenitiesHandler({
                ...amenities,
                [key]: {
                  ...amenities[key],
                  checked: newValue,
                },
              })
            }
            key={key}
          />
        );
      })}
    </FilterItem>
  );
};

export default Amenities;
