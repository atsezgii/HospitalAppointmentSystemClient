import { ListUserClaims } from "./list-user-claims";

export interface ListUserClaimsResponse{
  items: ListUserClaims[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
