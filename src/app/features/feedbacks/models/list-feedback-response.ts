import { ListFeedback } from "./list-feedback";

export interface ListFeedbackResponse{
  items: ListFeedback[];
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
