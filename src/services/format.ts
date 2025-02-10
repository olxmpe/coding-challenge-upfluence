import { DateTime, type HourNumbers, type WeekdayNumbers } from "luxon";

export const timestampToDayAndHour = (
  timestamp: number
): { day: WeekdayNumbers; hour: HourNumbers } => {
  const date = DateTime.fromSeconds(timestamp).toUTC();
  return { day: date.weekday, hour: date.hour };
};

export const stringToTitleCase = (str: string = ""): string => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
