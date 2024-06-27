import { ListUser } from "./list-user";

export interface UserListApiResponse {
  items: ListUser[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
