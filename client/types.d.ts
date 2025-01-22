import { Socket } from "socket.io-client";

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
  guarantee: Guarantee[];
  price: Price[];
  order: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
interface User {
  _id?: string;
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

interface UpdateProductInput {
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee[];
  price: Price[];
  updatedAt: string;
}
