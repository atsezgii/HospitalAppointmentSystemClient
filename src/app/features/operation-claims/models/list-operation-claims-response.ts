import { ListOperationClaims } from "./list-operation-claims";

export interface ListOperationClaimsResponse{
  items: ListOperationClaims[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
