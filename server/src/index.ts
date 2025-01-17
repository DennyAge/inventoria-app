import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

import mergedResolvers from "./resolvers";
import mergedTypeDefs from "./typeDefs";
import { connectDB } from "./db/connection";

interface MyContext {
  token?: string;
}

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New session connected");

  const activeSessions = io.engine.clientsCount;
  io.emit("activeSessions", activeSessions);

  socket.on("disconnect", () => {
    console.log("Session disconnected");
    io.emit("activeSessions", io.engine.clientsCount);
  });
});

const startServer = async () => {
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT! }, resolve),
  );
  await connectDB();
  console.log(`Server start on http://localhost:8080`);
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
