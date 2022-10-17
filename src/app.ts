import express from "express";

import { errorLogHandler, successLogHandler } from "config/morgan";
import { handleError } from "middlewares/errorHandler";
import { getRoutes } from "./modules";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(successLogHandler);
app.use(errorLogHandler);

app.get("/", (req, res) => {
  res.send("Oops! Nothing to see here!");
});

app.use("/api", getRoutes());

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Not Found",
    data: null,
  });
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
