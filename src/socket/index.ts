import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

const initSocket = (server: HTTPServer) => {
  const io = new IOServer(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export default initSocket;
