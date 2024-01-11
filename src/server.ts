import app from "./app";
import { createServer } from "http";
import connectMongoDB from "./config/db";
import { initSocketServer } from "./socket";
import logger from "./logger";

const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

connectMongoDB();
initSocketServer(httpServer);

const startServer = async () => {
  try {
    // await connectToDatabase();
    httpServer.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
};

// app.use cors
startServer();
