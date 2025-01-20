import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import mergedResolvers from "./resolvers";
import mergedTypeDefs from "./typeDefs";
import { connectDB } from "./db/connection";
import { authMiddleware } from "./middleware/authMiddleware";
import { socketIO } from "./lib/socket";
import * as process from "node:process";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(authMiddleware);

const httpServer = http.createServer(app);

interface Context {
  req: Express.Request;
  res: Express.Response;
  user?: {
    _id: string;
    email: string;
  };
}

const server = new ApolloServer<Context>({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL!,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

socketIO(io);

const startServer = async () => {
  await server.start();
  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT! }, resolve),
  );
  await connectDB();
  console.log(`Server start on http://localhost:${process.env.PORT}`);
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
