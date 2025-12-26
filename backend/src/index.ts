import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import dbClient from "./config/dbClient.config";

const PORT = process.env.PORT || 3000;

(async () => {
  await dbClient.connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    console.log("\n🛑 Shutting down...");
    await dbClient.disconnectDB();
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
})();
