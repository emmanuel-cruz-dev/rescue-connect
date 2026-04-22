import { Server, Socket } from "socket.io";

class SocketService {
  private io: Server | null = null;

  init(io: Server): void {
    this.io = io;

    io.on("connection", (socket: Socket) => {
      console.log(`🔌 Socket connected: ${socket.id}`);

      socket.on("join", (userId: string) => {
        socket.join(userId);
        console.log(`👤 User ${userId} joined their notification room`);
      });

      socket.on("disconnect", () => {
        console.log(`🔌 Socket disconnected: ${socket.id}`);
      });
    });
  }

  emitToUser(userId: string, event: string, data: any): void {
    if (!this.io) {
      console.warn("⚠️  SocketService not initialized");
      return;
    }
    this.io.to(userId).emit(event, data);
  }
}

export default new SocketService();
