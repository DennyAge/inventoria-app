import { defineNuxtPlugin } from "#app";
import { io, Socket } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const publicApi = config.public.apiBaseUrl;

  const socket: Socket = io(publicApi);
  const activeSessions = useState<number>("activeSessions", () => 0);
  socket.on("activeSessions", (count: number) => {
    activeSessions.value = count;
  });

  nuxtApp.provide("socket", socket);
});
