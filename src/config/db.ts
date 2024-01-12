import mongoose, { Error } from "mongoose";
import logger from "../logger";

const {
  NODE_ENV,
  MONGODB_ID,
  MONGODB_PASSWORD,
  MONGODB_SERVER,
  MONGODB_DB_NAME,
} = process.env;

const URL = `mongodb://${MONGODB_ID}:${MONGODB_PASSWORD}@${MONGODB_SERVER}`;

mongoose.connection.on("error", (e: Error) => {
  logger.error(`Error : ${e.message}`);
});

const connect = async () => {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  await mongoose
    .connect(URL, {
      dbName: MONGODB_DB_NAME,
    })
    .then(() => {
      logger.info("MongoDB Connected");
    })
    .catch((e: Error) => {
      logger.error(`Error : ${e.message}`);
      process.exit(1);
    });
};

export default connect;
