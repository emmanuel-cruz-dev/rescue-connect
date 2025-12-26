import { MongoClient, Db } from "mongodb";

class DbClient {
  client: MongoClient;
  db: Db | null = null;
  private connectionPromise: Promise<void>;

  constructor() {
    const queryString =
      process.env.MONGODB_URI || "mongodb://localhost:27017/pets";
    this.client = new MongoClient(queryString);
    this.connectionPromise = this.connectDB();
  }

  async connectDB() {
    try {
      await this.client.connect();
      this.db = this.client.db("adoption");
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error connecting to MongoDB", err);
      throw err;
    }
  }

  async ensureConnection() {
    await this.connectionPromise;
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db;
  }
}

export default new DbClient();
