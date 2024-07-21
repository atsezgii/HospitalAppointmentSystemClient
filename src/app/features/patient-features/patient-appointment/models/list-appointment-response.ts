import { ListAppointment } from "./list-appointment";

export interface AppointmentResponse {
  items: ListAppointment[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
