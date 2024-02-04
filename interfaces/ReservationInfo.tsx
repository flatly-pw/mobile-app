export default interface ReservationInfo {
  reservationId: number;
  flatId: string;
  addressDto: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  startDate: string;
  endDate: string;
  owner: {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    registeredSince: string;
  };
  clientName: string;
  clientLastName: string;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  facilities: string[];
  adults: number;
  children: number;
  pets: number;
  price: number;
  specialRequests: string;
  status: string;
}
