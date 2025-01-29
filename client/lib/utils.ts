import type { Product } from "~/types";
import { Chart } from "chart.js/auto";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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

export const formatTimestampLong = (
  timestampStr: string | undefined,
  locale: string,
) => {
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

export const formatCurrency = (value: number) => {
  if (value === 0) return value.toString();
  if (value >= 10000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      currencyDisplay: "narrowSymbol",
      currency: "USD",
      style: "currency",
    }).format(value);
  }
  return formattedBudgetCurrency(value);
};

export const formattedBudgetCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    currencyDisplay: "narrowSymbol",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/, "");
};

export const crossLine = (chart: Chart, mousemove: MouseEvent) => {
  chart.update("none");
  const y = mousemove.offsetY;
  const x = mousemove.offsetX;

  const {
    ctx,
    chartArea: { top, bottom, left, right },
  } = chart;

  if (x < left || x > right || y < top || y > bottom) return;

  ctx.save();
  ctx.setLineDash([6, 6]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#282828";

  if (y >= top && y <= bottom) {
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    ctx.closePath();

    const yValue = chart.scales.y.getValueForPixel(y);
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(20, 20, 20, 0.08)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.roundRect(left, y - 25, 80, 20, 8);
    ctx.fill();

    ctx.fillStyle = "#282828";
    ctx.font = "12px Arial";
    if (typeof yValue === "number") {
      ctx.fillText(`$ ${Math.round(yValue)} avg.`, left + 10, y - 10);
    }
  }

  ctx.setLineDash([]);
  ctx.restore();
};
