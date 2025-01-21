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
  isDefault: number;
}

interface Guarantee {
  start: string;
  end: string;
}

interface Product {
  _id: string;
  serialNumber: string;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: number;
  date: string;
}

interface Order {
  _id: string;
  title: string;
  date: string;
  description: string;
}
interface User {
  _id?: string;
  fullName: string;
  email: string;
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
