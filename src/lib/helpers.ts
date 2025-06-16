import { subDays, subMonths, subYears } from "date-fns";

export function getDateRange(filter: string) {
  const now = new Date();
  switch (filter) {
    case "7d":
      return subDays(now, 7);
    case "30d":
      return subDays(now, 30);
    case "3m":
      return subMonths(now, 3);
    case "1y":
      return subYears(now, 1);
    default:
      return subDays(now, 7); // Default to last 7 days
  }
}

export function debounce(
  func: (...args: unknown[]) => void | unknown,
  delay: number
) {
  let timeoutId: NodeJS.Timeout;
  return function <T extends unknown[]>(...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
