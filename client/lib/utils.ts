import type { Product } from "~/types";

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const formatDate = (date: Date, locale: string): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(date);
};
export const formatTime = (date: Date, locale: string): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formatter.format(date);
};
export const getDayOfWeek = (date: Date, locale: string): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });
  return formatter.format(date);
};

export const formatTimestampLong = (timestampStr: string, locale: string) => {
  const timestamp = Number(timestampStr);

  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString(locale, { month: "short" });
  const year = date.getFullYear();

  return `${day} / ${month} / ${year}`;
};
export const formatTimestampShort = (timestampStr: string) => {
  const timestamp = Number(timestampStr);

  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day} / ${month}`;
};

export const sumPricesByProduct = (
  data: Product[] | Product,
): { USD: number; UAH: number } => {
  const products = Array.isArray(data) ? data : [data];

  return products.reduce(
    (acc, item) => {
      item.price.forEach((priceItem) => {
        if (priceItem?.symbol === "USD") {
          acc.USD += priceItem?.value;
        } else if (priceItem?.symbol === "UAH") {
          acc.UAH += priceItem?.value;
        }
      });
      return acc;
    },
    { USD: 0, UAH: 0 },
  );
};
