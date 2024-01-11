import app from "./app";
import dotenv from "dotenv";
import { createServer } from "http";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

import connectMongoDB from "./config/db";
import { initSocketServer } from "./socket";

const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

connectMongoDB();
initSocketServer(httpServer);

const startServer = async () => {
  try {
    // await connectToDatabase();
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

// app.use cors
startServer();
