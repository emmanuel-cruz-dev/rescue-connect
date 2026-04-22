import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app";
import dbClient from "./config/dbClient.config";
import socketService from "./services/socket.service";

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.FRONTEND_URL || "http://localhost:4200";

(async () => {
  await dbClient.connectDB();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  socketService.init(io);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔌 Socket.io ready`);
  });

  const shutdown = async () => {
    console.log("\n🛑 Shutting down...");
    await dbClient.disconnectDB();
    httpServer.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
})();
