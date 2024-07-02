import { ListPatient } from "./list-patient";

export interface ListPatientResponse {
  items: ListPatient[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
