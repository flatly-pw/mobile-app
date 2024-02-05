export default interface ReservationData {
  street: string;
  postalCode: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  nightsCount: number;
  adults: number;
  children: number;
  pets: number;
  price: number;
  flatId: string;
  specialRequests: string;
  latitude: number;
  longitude: number;
}
