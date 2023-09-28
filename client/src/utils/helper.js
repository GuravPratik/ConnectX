import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";

export function formatDateFromNow(date) {
  return formatDistanceToNow(parseISO(date), new Date(), {
    addSuffix: true,
  });
}
