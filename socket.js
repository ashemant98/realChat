import { Server } from "socket.io";
import http from "http";
import socketAuthMiddleware from "./middleware/socketAuthMiddleware.js";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.username);
  const userId = socket.userId;
  userSocketMap[userId] = socket.userId;

  io.emit("getOnLineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", (socket) => {
    console.log("a user disconnected", socket.username);
    delete userSocketMap[userId];
    io.emit("getOnLineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
