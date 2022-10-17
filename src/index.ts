import http from "http";

import app from "./app";
import logger from "config/logger";
import config from "config/config";

let server: http.Server;

const main = async () => {
  server = app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
};

main().catch((err: Error) => {
  logger.error(`Server failed to start: ${err.message}`);
  process.exit();
});


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
