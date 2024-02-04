import Review from "./Review";

export default interface FlatOfferData {
  area: number;
  capacity: number;
  bathrooms: number;
  bedrooms: number;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  facilities: string[];
  reviews: Review[];
  gallery: string[];
  ownerName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  ownerRegisteredSince: string;
  numberOfReviews: number;
}
