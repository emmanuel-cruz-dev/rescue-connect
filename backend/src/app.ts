import express from "express";
import petsRouter from "./routes/pets.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/pets", petsRouter);

export default app;
