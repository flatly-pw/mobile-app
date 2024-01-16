import Currency from "../types/Currency";
import Language from "../types/Language";
import MeasurementSystem from "../types/MeasurementSystem";

export default interface UserSettings {
  name: string;
  lastName: string;
  email: string;
  currency: Currency;
  units: MeasurementSystem;
  language: Language;
}
