import type { Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import logger from "./logger";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_URL}:6379`,
});

let io: SocketIOServer | null = null;

async function joinRoom(socket: Socket, io: SocketIOServer, roomId: string) {
  logger.info(`${socket.id} Joined the ${roomId}`);

  const userId = socket.id;

  await redisClient.sAdd(`room:${roomId}`, userId);

  // Fetch current users in the room
  const users = await redisClient.sMembers(`room:${roomId}`);

  // Join the socket.io room
  socket.join(roomId);

  io.to(roomId).emit("roomUsers", users);
}

export const initSocketServer = async (server: Server) => {
  const io = new SocketIOServer({
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    path: "/socket.io",
  });

  const pubClient = createClient({
    url: `redis://${process.env.REDIS_URL}:6379`,
  });

  const subClient = pubClient.duplicate();

  await Promise.all([
    pubClient.connect(),
    subClient.connect(),
    redisClient.connect(),
  ]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    io.listen(server);
  });

  const chatIO = io.of("/chat");

  chatIO.on("connection", (socket) => {
    logger.info(`User connected with id ${socket.id}`);

    socket.on("message", (data) => {
      logger.info(`Received message from ${socket.id}: ${data}`);
      io.emit("message", "Received from Server"); // broadcast the message to all clients
    });

    socket.on("disconnect", () => {
      logger.info(`User ${socket.id} disconnected`);
    });

    socket.on("joinRoom", (roomId: string) => {
      joinRoom(socket, io, roomId);
    });

    socket.on("leaveRoom", (roomName: string) => {
      socket.leave(roomName);
    });

    socket.on("createRoom", (roomName: string) => {});
  });

  return io;
};

export const getSocketIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
