import { Server } from "socket.io";
import http from "http";

class SocketService {
  private static io: Server;

  public static initialize(server: http.Server) {
    if (!SocketService.io) {
      SocketService.io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
      SocketService.io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
      });
    }
  }

  public static getIO(): Server {
    if (!SocketService.io) {
      throw new Error("Socket.io not initialized!");
    }
    return SocketService.io;
  }
}

export default SocketService;