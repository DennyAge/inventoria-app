import type { Guarantee } from "~/types";

export const navigationLinks = [
  {
    path: "/",
    name: "dashboard",
    icon: "lucide:house",
  },
  {
    path: "/orders",
    name: "orders",
    icon: "lucide:list-ordered",
  },
  {
    path: "/products",
    name: "product",
    icon: "lucide:monitor",
  },
];

export const productSpecification = {
  en: ["Display", "Performance", "Camera", "Battery", "Other Features"],
  ru: [
    "Экран",
    "Производительность",
    "Камера",
    "Батарея",
    "Дополнительные характеристики",
  ],
  ua: [
    "Екран",
    "Продуктивність",
    "Камера",
    "Батарея",
    "Додаткові характеристики",
  ],
};
export const productTypes = {
  en: [
    "Smartphones",
    "Laptops",
    "Smart watches",
    "Wireless headphones",
    "Tablets",
  ],
  ru: [
    "Смартфоны",
    "Ноутбуки",
    "Смарт-часы",
    "Беспроводные наушники",
    "Планшеты",
  ],
  ua: [
    "Смартфони",
    "Ноутбуки",
    "Смарт-годинник",
    "Бездротові навушники",
    "Планшети",
  ],
};

export const productGuarantee = {
  en: ["1 month", "3 month", "6 month", "1 year"],
  ru: ["1 месяц", "3 месяца", "6 месяцев", "1 год"],
  ua: ["1 місяць", "3 місяць", "6 місяців ", "1 рік"],
};
