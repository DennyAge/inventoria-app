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
