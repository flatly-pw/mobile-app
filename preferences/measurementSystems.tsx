import Language from "../types/Language";
import MeasurementSystem from "../types/MeasurementSystem";

type MeasurementSystems = {
  [key in MeasurementSystem]: {
    distanceSign: { [lang in Language]: string };
    KMtoDistance: number;
  };
};

const measurementSystems: MeasurementSystems = {
  metric: {
    distanceSign: {
      "en-US": "km",
      "pl-PL": "km",
    },
    KMtoDistance: 1,
  },
  imperial: {
    distanceSign: {
      "en-US": "miles",
      "pl-PL": "mil",
    },
    KMtoDistance: 0.62,
  },
};

const getDistanceWithUnit = (
  distance: number,
  measurementSystem: MeasurementSystem,
  language: Language,
  accuracy: number = 0
) => {
  return (
    (distance * measurementSystems[measurementSystem].KMtoDistance).toFixed(accuracy).toString() +
    " " +
    measurementSystems[measurementSystem].distanceSign[language]
  );
};

export default getDistanceWithUnit;
