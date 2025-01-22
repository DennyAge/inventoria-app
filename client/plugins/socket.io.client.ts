import { defineNuxtPlugin } from "#app";
import { io, Socket } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const socket: Socket = io("http://localhost:8080");
  const activeSessions = useState<number>("activeSessions", () => 0);
  socket.on("activeSessions", (count: number) => {
    activeSessions.value = count;
  });

  nuxtApp.provide("socket", socket);
});
