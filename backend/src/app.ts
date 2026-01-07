import "./docs/swagger";
import "./docs/routes.swagger";

import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import apiRouter from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use(errorHandler);

export default app;
