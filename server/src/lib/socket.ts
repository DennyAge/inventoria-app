import { Server, Socket } from "socket.io";

export const socketIO = (io: Server): void => {
  io.on("connection", (socket: Socket): void => {
    const activeSessions = io.engine.clientsCount;
    io.emit("activeSessions", activeSessions);

    socket.on("disconnect", () => {
      io.emit("activeSessions", io.engine.clientsCount);
    });
  });
};
