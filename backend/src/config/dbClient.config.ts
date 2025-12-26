import mongoose from "mongoose";

class DbClient {
  private connectionPromise: Promise<typeof mongoose>;

  constructor() {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/pets";

    this.connectionPromise = mongoose.connect(uri);
  }

  async connectDB() {
    try {
      await this.connectionPromise;
      console.log("✅ MongoDB connected");

      mongoose.connection.on("error", (error) => {
        console.error("❌ MongoDB connection error", error);
      });
    } catch (error) {
      console.error("❌ MongoDB connection failed", error);
      process.exit(1);
    }
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("🛑 MongoDB disconnected");
  }
}

export default new DbClient();
