import type { Server } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export const initSocketServer = (server: Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with id ${socket.id}`);

    socket.on("message", (data) => {
      console.log(`Received message from ${socket.id}: ${data}`);
      io.emit("message", "Received from Server"); // broadcast the message to all clients
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });

    socket.on("joinRoom", (roomName: string) => {
      console.log(`${socket.id} Joined the ${roomName}`);
      socket.join(roomName);

      socket.emit("Welcome", "Welcome to roomA");

      // socket.id 를 제외한 room에 있는 모두에게
      socket
        .to(roomName)
        .emit("RoomMessage", `${socket.id} has joined ${roomName}`);
    });
  });

  return io;
};

export const getSocketIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
