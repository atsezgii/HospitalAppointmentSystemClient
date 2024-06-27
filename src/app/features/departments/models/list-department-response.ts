import { ListDepartment } from "./list-department";

export interface ListDepartmentResponse{
  items: ListDepartment[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
