import { Socket } from "socket.io-client";
import { TranslateResult } from "vue-i18n";

declare module "#app" {
  interface NuxtApp {
    $socket: Socket;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}
declare module "vue/types/vue" {
  interface Vue {
    $t(key: string, values?: Record<string, unknown>): TranslateResult;
  }
}

interface Price {
  value: number;
  symbol: string;
  isDefault: boolean;
}

interface Guarantee {
  start: string;
  end: string;
}

interface Product {
  _id: string;
  serialNumber: string;
  isUsed: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Array<{
    value: number;
    symbol: string;
    isDefault: boolean;
  } | null>;
  order: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  title: string;
  description: string;
  products: (string | null)[];
  createdAt: string;
  updatedAt: string;
}
interface User {
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
interface LoginInput {
  email: string;
  password: string;
}

interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
}
interface OrderInput {
  title: string;
  description: string;
}
interface UpdateProductInput {
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  isUsed: boolean;
}
interface CreateProductInput {
  isUsed: boolean;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: string;
}
