export default interface Reservation {
  flatId: string;
  reservationId: number;
  title: string;
  thumbnailUrl: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}
