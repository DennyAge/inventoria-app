import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import router from "./routes";

interface MyContext {
  token?: string;
}

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
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

mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE_URL!);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());

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
  console.log(`Server start on http://localhost:8080`);
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
