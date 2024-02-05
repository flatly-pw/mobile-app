export default interface ReservationPostData {
  flatId: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  pets: number;
  specialRequests: string;
}
