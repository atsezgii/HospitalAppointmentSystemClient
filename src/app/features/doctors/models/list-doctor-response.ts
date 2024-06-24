import { ListDoctor } from "./list-doctor";

export interface ApiResponse {
  items: ListDoctor[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
