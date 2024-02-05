type TranslationsKeys =
  | "CHECK_IN"
  | "CHECK_OUT"
  | "EXACT_ADDRESS"
  | "CONTACT"
  | "BOOKED"
  | "PRICE"
  | "CANCEL_RESERVATION"
  | "GO_BACK"
  | "RESERVATION_DETAILS"
  | "ACTIVE"
  | "PASSED"
  | "CANCELLED"
  | "OWNER"
  | "ACTIVE_SINCE"
  | "PHONE"
  | "BATHROOMS_LOWERCASE"
  | "BEDROOMS_LOWERCASE"
  | "PEOPLE"
  | "REVIEWS"
  | "NIGHT"
  | "BOOK_NOW"
  | "DESCRIPTION"
  | "FACILITIES"
  | "LOCATION"
  | "CHAIR"
  | "BREAKFAST_INCLUDED"
  | "PRIVATE_BATHROOM"
  | "GALLERY"
  | "RATINGS"
  | "DEC"
  | "NOV"
  | "OCT"
  | "SEP"
  | "AUG"
  | "JUL"
  | "JUN"
  | "MAY"
  | "APR"
  | "MAR"
  | "FEB"
  | "JAN"
  | "DECEMBER"
  | "NOVEMBER"
  | "OCTOBER"
  | "SEPTEMBER"
  | "AUGUST"
  | "JULY"
  | "JUNE"
  | "MAY"
  | "APRIL"
  | "MARCH"
  | "FEBRUARY"
  | "JANUARY"
  | "SUN"
  | "SAT"
  | "FRI"
  | "THU"
  | "WED"
  | "TUE"
  | "MON"
  | "SUNDAY"
  | "SATURDAY"
  | "FRIDAY"
  | "THURSDAY"
  | "WEDNESDAY"
  | "TUESDAY"
  | "MONDAY"
  | "NEW_PASSWORD"
  | "OLD_PASSWORD"
  | "PASSWORD"
  | "EMAIL"
  | "LAST_NAME"
  | "NAME"
  | "CANCEL"
  | "APPLY"
  | "EDIT"
  | "LEGAL_NAME"
  | "STAYS"
  | "NO_FLATS_FOUND"
  | "NO_RESERVATIONS_FOUND"
  | "ERROR_WHILE_FETCHING_RESOURCES"
  | "SHOW_FLATS"
  | "TV"
  | "KITCHEN"
  | "WIFI"
  | "AMENITIES"
  | "GUEST_HOUSE"
  | "FLAT"
  | "HOTEL"
  | "ACCOMODATION_TYPE"
  | "RATING"
  | "BATHROOMS"
  | "BEDS"
  | "BEDROOMS"
  | "ANY"
  | "ROOMS_AND_BEDS"
  | "MAXIMUM"
  | "MINIMUM"
  | "PER_NIGHT"
  | "PRICE_RANGE"
  | "ENTIRE_HOME"
  | "ROOM"
  | "ANY_TYPE"
  | "TYPE_OF_PLACE"
  | "FILTERS"
  | "SEARCH"
  | "CLEAR_ALL"
  | "SOME_EXOTIC_ANIMALS_MAY_NOT_BE_ALLOWED"
  | "PETS"
  | "UNDER_13"
  | "CHILDREN"
  | "AGES_13_OR_ABOVE"
  | "ADULTS"
  | "WHO"
  | "WHEN"
  | "SEARCH_DESTINATIONS"
  | "FROM_CENTER"
  | "WHERE_TO"
  | "HOME"
  | "BOOKINGS"
  | "PROFILE"
  | "SIGN_OUT"
  | "MANAGE_USER"
  | "SETTINGS"
  | "PROFILE"
  | "US_DOLLAR"
  | "EURO"
  | "POLISH_ZLOTY"
  | "CURRENCY"
  | "PREFERENCES"
  | "MEASUREMENT_SYSTEM"
  | "LANGUAGE"
  | "METRIC_METER_KILOGRAM"
  | "IMPERIAL_INCH_POUND";

type Translations = {
  [key in TranslationsKeys]: {
    "en-US": string;
    "pl-PL": string;
  };
};

const translations: Translations = {
  OWNER: {
    "en-US": "Owner",
    "pl-PL": "Właściciel",
  },
  ACTIVE_SINCE: {
    "en-US": "active since",
    "pl-PL": "aktywny od",
  },
  PHONE: {
    "en-US": "phone",
    "pl-PL": "telefon",
  },
  BATHROOMS_LOWERCASE: {
    "en-US": "bathrooms",
    "pl-PL": "łazienki",
  },
  BEDROOMS_LOWERCASE: {
    "en-US": "bedrooms",
    "pl-PL": "sypialnie",
  },
  PEOPLE: {
    "en-US": "people",
    "pl-PL": "osoby",
  },
  REVIEWS: {
    "en-US": "Reviews",
    "pl-PL": "Opinie",
  },
  NIGHT: {
    "en-US": "night",
    "pl-PL": "noc",
  },
  BOOK_NOW: {
    "en-US": "Book now",
    "pl-PL": "Zarezerwuj",
  },
  DESCRIPTION: {
    "en-US": "Description",
    "pl-PL": "Opis",
  },
  FACILITIES: {
    "en-US": "Facilities",
    "pl-PL": "Udogodnienia",
  },
  LOCATION: {
    "en-US": "Location",
    "pl-PL": "Lokalizacja",
  },
  CHAIR: {
    "en-US": "chair",
    "pl-PL": "krzesło",
  },
  BREAKFAST_INCLUDED: {
    "en-US": "breakfast included",
    "pl-PL": "śniadanie wliczone w cenę",
  },
  PRIVATE_BATHROOM: {
    "en-US": "private bathroom",
    "pl-PL": "prywatna łazienka",
  },
  GALLERY: {
    "en-US": "Gallery",
    "pl-PL": "Galeria zdjęć",
  },
  RATINGS: {
    "en-US": "ratings",
    "pl-PL": "ocen(y)",
  },
  CURRENCY: {
    "en-US": "Currency",
    "pl-PL": "Waluta",
  },
  PREFERENCES: {
    "en-US": "Preferences",
    "pl-PL": "Preferencje",
  },
  MEASUREMENT_SYSTEM: {
    "en-US": "Measurement system",
    "pl-PL": "System pomiarowy",
  },
  LANGUAGE: {
    "en-US": "Language",
    "pl-PL": "Język",
  },
  METRIC_METER_KILOGRAM: {
    "en-US": "Metric (meter, kilogram)",
    "pl-PL": "Metryczny (metr, kilogram)",
  },
  IMPERIAL_INCH_POUND: {
    "en-US": "Imperial (inch, pound)",
    "pl-PL": "Imperialny (cal, funt)",
  },
  US_DOLLAR: {
    "en-US": "U.S. Dollar",
    "pl-PL": "Dolar amerykański",
  },
  EURO: {
    "en-US": "Euro",
    "pl-PL": "Euro",
  },
  POLISH_ZLOTY: {
    "en-US": "Polish zloty",
    "pl-PL": "Polski złoty",
  },
  ACCOMODATION_TYPE: {
    "en-US": "Accomodation type",
    "pl-PL": "Typ zakwaterowania",
  },
  ADULTS: {
    "en-US": "Adults",
    "pl-PL": "Dorośli",
  },
  AGES_13_OR_ABOVE: {
    "en-US": "Ages 13 or above",
    "pl-PL": "Powyżej 13 roku życia (włącznie)",
  },
  AMENITIES: {
    "en-US": "Amenitires",
    "pl-PL": "Wyposażenie",
  },
  ANY: {
    "en-US": "Any",
    "pl-PL": "Dowolna",
  },
  ANY_TYPE: {
    "en-US": "Any type",
    "pl-PL": "Dowolny",
  },
  BATHROOMS: {
    "en-US": "Bathrooms",
    "pl-PL": "Łazienki",
  },
  BEDROOMS: {
    "en-US": "Bedrooms",
    "pl-PL": "Sypialnie",
  },
  BEDS: {
    "en-US": "Beds",
    "pl-PL": "Łóżka",
  },
  BOOKINGS: {
    "en-US": "Bookings",
    "pl-PL": "Rezerwacje",
  },
  CHILDREN: {
    "en-US": "Children",
    "pl-PL": "Dzieci",
  },
  CLEAR_ALL: {
    "en-US": "Clear all",
    "pl-PL": "Wyczyść wszystko",
  },
  ENTIRE_HOME: {
    "en-US": "Entire home",
    "pl-PL": "Dom",
  },
  ERROR_WHILE_FETCHING_RESOURCES: {
    "en-US": "Error while fetching resources.",
    "pl-PL": "Problem przy pobieraniu danych.",
  },
  FILTERS: {
    "en-US": "Filters",
    "pl-PL": "Filtry",
  },
  FLAT: {
    "en-US": "Flat",
    "pl-PL": "Blok",
  },
  FROM_CENTER: {
    "en-US": "from center",
    "pl-PL": "od centrum",
  },
  GUEST_HOUSE: {
    "en-US": "Guest house",
    "pl-PL": "Pensjonat",
  },
  HOME: {
    "en-US": "Home",
    "pl-PL": "Strona główna",
  },
  HOTEL: {
    "en-US": "Hotel",
    "pl-PL": "Hotel",
  },
  KITCHEN: {
    "en-US": "Kitchen",
    "pl-PL": "Kuchnia",
  },
  MANAGE_USER: {
    "en-US": "Manage user",
    "pl-PL": "Zarządzaj ustawieniami",
  },
  MAXIMUM: {
    "en-US": "Maximum",
    "pl-PL": "Maksymalnie",
  },
  MINIMUM: {
    "en-US": "Minimum",
    "pl-PL": "Minimalnie",
  },
  NO_FLATS_FOUND: {
    "en-US": "No flats found.",
    "pl-PL": "Nie znaleziono ofert.",
  },
  NO_RESERVATIONS_FOUND: {
    "en-US": "No reservations with current status.",
    "pl-PL": "Brak rezerwacji o obecnym statusie.",
  },
  PER_NIGHT: {
    "en-US": "per night",
    "pl-PL": "za noc",
  },
  PETS: {
    "en-US": "Pets",
    "pl-PL": "Zwierzęta",
  },
  PRICE_RANGE: {
    "en-US": "Price range",
    "pl-PL": "Widełki cenowe",
  },
  PROFILE: {
    "en-US": "Profile",
    "pl-PL": "Profil",
  },
  RATING: {
    "en-US": "Rating",
    "pl-PL": "Ocena",
  },
  ROOM: {
    "en-US": "Room/s",
    "pl-PL": "Pokój/e",
  },
  ROOMS_AND_BEDS: {
    "en-US": "Rooms and beds",
    "pl-PL": "Pokoje i łóżka",
  },
  SEARCH: {
    "en-US": "Search",
    "pl-PL": "Szukaj",
  },
  SEARCH_DESTINATIONS: {
    "en-US": "Search destinations",
    "pl-PL": "Szukaj celu podróży",
  },
  SETTINGS: {
    "en-US": "Settings",
    "pl-PL": "Ustawienia",
  },
  SHOW_FLATS: {
    "en-US": "Show flats",
    "pl-PL": "Pokaż oferty",
  },
  SIGN_OUT: {
    "en-US": "Sign Out",
    "pl-PL": "Wyloguj się",
  },
  SOME_EXOTIC_ANIMALS_MAY_NOT_BE_ALLOWED: {
    "en-US": "Some exotic animals may not be allowed",
    "pl-PL": "Niektóre egzotyczne gatunki zwierząt mogą być niedozwolone",
  },
  TV: {
    "en-US": "TV",
    "pl-PL": "TV",
  },
  TYPE_OF_PLACE: {
    "en-US": "Type of place",
    "pl-PL": "Rodzaj miejsca",
  },
  UNDER_13: {
    "en-US": "Under 13",
    "pl-PL": "Poniżej 13",
  },
  WHEN: {
    "en-US": "When?",
    "pl-PL": "Kiedy?",
  },
  WHERE_TO: {
    "en-US": "Where to?",
    "pl-PL": "Dokąd zmierzasz?",
  },
  WHO: {
    "en-US": "Who?",
    "pl-PL": "Kto?",
  },
  WIFI: {
    "en-US": "WiFi",
    "pl-PL": "WiFi",
  },
  STAYS: {
    "en-US": "Stays",
    "pl-PL": "Pobyt",
  },
  PASSWORD: {
    "en-US": "Password",
    "pl-PL": "Hasło",
  },
  EMAIL: {
    "en-US": "Email",
    "pl-PL": "Email",
  },
  LAST_NAME: {
    "en-US": "Last Name",
    "pl-PL": "Nazwisko",
  },
  NAME: {
    "en-US": "Name",
    "pl-PL": "Imię",
  },
  CANCEL: {
    "en-US": "Cancel",
    "pl-PL": "Anuluj",
  },
  APPLY: {
    "en-US": "Apply",
    "pl-PL": "Zapisz",
  },
  EDIT: {
    "en-US": "Edit",
    "pl-PL": "Edytuj",
  },
  LEGAL_NAME: {
    "en-US": "Legal name",
    "pl-PL": "Imię i nazwisko",
  },
  OLD_PASSWORD: {
    "en-US": "Old password",
    "pl-PL": "Stare hasło",
  },
  NEW_PASSWORD: {
    "en-US": "New password",
    "pl-PL": "Nowe hasło",
  },
  MONDAY: {
    "en-US": "Monday",
    "pl-PL": "Poniedziałek",
  },
  TUESDAY: {
    "en-US": "Tuesday",
    "pl-PL": "Wtorek",
  },
  WEDNESDAY: {
    "en-US": "Wednesday",
    "pl-PL": "Środa",
  },
  THURSDAY: {
    "en-US": "Thursday",
    "pl-PL": "Czwarte",
  },
  FRIDAY: {
    "en-US": "Friday",
    "pl-PL": "Piątek",
  },
  SATURDAY: {
    "en-US": "Saturday",
    "pl-PL": "Sobota",
  },
  SUNDAY: {
    "en-US": "Sunday",
    "pl-PL": "Niedziela",
  },
  MON: {
    "en-US": "Mon",
    "pl-PL": "Pon",
  },
  TUE: {
    "en-US": "Tue",
    "pl-PL": "Wto",
  },
  WED: {
    "en-US": "Wed",
    "pl-PL": "Śro",
  },
  THU: {
    "en-US": "Thu",
    "pl-PL": "Czw",
  },
  FRI: {
    "en-US": "Fri",
    "pl-PL": "Pią",
  },
  SAT: {
    "en-US": "Sat",
    "pl-PL": "Sob",
  },
  SUN: {
    "en-US": "Sun",
    "pl-PL": "Nie",
  },
  JANUARY: {
    "en-US": "January",
    "pl-PL": "Styczeń",
  },
  FEBRUARY: {
    "en-US": "February",
    "pl-PL": "Luty",
  },
  MARCH: {
    "en-US": "March",
    "pl-PL": "Marzec",
  },
  APRIL: {
    "en-US": "April",
    "pl-PL": "Kwiecień",
  },
  MAY: {
    "en-US": "May",
    "pl-PL": "Maj",
  },
  JUNE: {
    "en-US": "June",
    "pl-PL": "Czerwiec",
  },
  JULY: {
    "en-US": "July",
    "pl-PL": "Lipiec",
  },
  AUGUST: {
    "en-US": "August",
    "pl-PL": "Sierpień",
  },
  SEPTEMBER: {
    "en-US": "September",
    "pl-PL": "Wrzesień",
  },
  OCTOBER: {
    "en-US": "October",
    "pl-PL": "Październik",
  },
  NOVEMBER: {
    "en-US": "November",
    "pl-PL": "Listopad",
  },
  DECEMBER: {
    "en-US": "December",
    "pl-PL": "Grudzień",
  },
  JAN: {
    "en-US": "Jan",
    "pl-PL": "Sty",
  },
  FEB: {
    "en-US": "Feb",
    "pl-PL": "Lut",
  },
  MAR: {
    "en-US": "Mar",
    "pl-PL": "Mar",
  },
  APR: {
    "en-US": "Apr",
    "pl-PL": "Kwi",
  },
  JUN: {
    "en-US": "Jun",
    "pl-PL": "Cze",
  },
  JUL: {
    "en-US": "Jul",
    "pl-PL": "Lip",
  },
  AUG: {
    "en-US": "Aug",
    "pl-PL": "Sie",
  },
  SEP: {
    "en-US": "Sep",
    "pl-PL": "Wrz",
  },
  OCT: {
    "en-US": "Oct",
    "pl-PL": "Paź",
  },
  NOV: {
    "en-US": "Nov",
    "pl-PL": "Lis",
  },
  DEC: {
    "en-US": "Dec",
    "pl-PL": "Gru",
  },
  ACTIVE: {
    "en-US": "Active",
    "pl-PL": "Aktywne",
  },
  PASSED: {
    "en-US": "Passed",
    "pl-PL": "Po terminie",
  },
  CANCELLED: {
    "en-US": "Cancelled",
    "pl-PL": "Anulowane",
  },
  CHECK_IN: {
    "en-US": "Check in",
    "pl-PL": "Meldunek",
  },
  CHECK_OUT: {
    "en-US": "Check out",
    "pl-PL": "Wymeldunek",
  },
  EXACT_ADDRESS: {
    "en-US": "Exact address",
    "pl-PL": "Dokładny adres",
  },
  CONTACT: {
    "en-US": "Contact",
    "pl-PL": "Kontant",
  },
  BOOKED: {
    "en-US": "Booked",
    "pl-PL": "Zarezerwowano",
  },
  PRICE: {
    "en-US": "Price",
    "pl-PL": "Cena",
  },
  CANCEL_RESERVATION: {
    "en-US": "Cancel reservation",
    "pl-PL": "Anuluj rezerwacje",
  },
  GO_BACK: {
    "en-US": "Go back",
    "pl-PL": "Cofnij",
  },
  RESERVATION_DETAILS: {
    "en-US": "Reservation details",
    "pl-PL": "Szczegóły rezerwacji",
  },
};

export default translations;
