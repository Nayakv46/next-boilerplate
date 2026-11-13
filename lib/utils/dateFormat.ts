import { format } from "date-fns";

export const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

export const formatIsoDateToReadable = (dateString: string): string => {
  return format(new Date(dateString), "dd MMM yyyy");
};

export const getFirstDayMonthsAgo = (monthsAgo: number) => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
};

export const getMonthName = (date: Date | string, locale = "en-US") => {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleString(locale, {
    month: "long",
  });
};

export const getMonthNameShort = (date: Date | string, locale = "en-US") => {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleString(locale, {
    month: "short",
  });
};

export const dateInNextDays = (nextDays: number) => {
  return new Date(new Date().setDate(new Date().getDate() + nextDays));
};

export const dateInNextDaysFrom = (date: Date, nextDays: number) => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() + nextDays);

  return newDate;
};
