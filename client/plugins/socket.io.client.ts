import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const socket = io("http://localhost:8080");

  return {
    provide: {
      io: socket,
    },
  };
});
