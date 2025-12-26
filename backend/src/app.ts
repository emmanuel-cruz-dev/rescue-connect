import express from "express";
import petsRouter from "./routes/pets.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/pets", petsRouter);
app.use(errorHandler);

export default app;
