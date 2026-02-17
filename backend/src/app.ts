import "./docs/swagger";
import "./docs/routes.swagger";

import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import apiRouter from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

app.get("/", (_req, res) => {
  res.json({
    message: "API is running 🚀",
    status: "ok",
    docs: "/api/v1/docs",
  });
});

app.use(errorHandler);

export default app;
