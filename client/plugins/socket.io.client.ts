import { io, Socket } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const socket: Socket = io("http://localhost:8080"); //  <=нужно не забыть пофиксить!!!
  return {
    provide: {
      socket,
    },
  };
});
