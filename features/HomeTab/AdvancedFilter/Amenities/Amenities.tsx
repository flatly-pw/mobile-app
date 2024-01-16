import AmenitiesItem from "./AmenitiesItem/AmenitiesItem";
import { AmenitiesType } from "../AdvancedFilter";
import FilterItem from "../FilterItem/FilterItem";

interface AmenitiesProps {
  amenities: AmenitiesType[];
  amenitiesHandler: (newValue: AmenitiesType[]) => void;
}

const Amenities = ({ amenities, amenitiesHandler }: AmenitiesProps) => {
  return (
    <FilterItem title="Amenities">
      {amenities.map((amenity) => {
        return (
          <AmenitiesItem
            label={amenity.label}
            status={amenity.checked}
            statusHandler={(newValue: boolean) => {
              return amenitiesHandler(
                amenities.map((_amenity) => {
                  if (amenity.id === _amenity.id) {
                    return { ..._amenity, checked: newValue };
                  }
                  return _amenity;
                })
              );
            }}
            key={amenity.id}
          />
        );
      })}
    </FilterItem>
  );
};

export default Amenities;
