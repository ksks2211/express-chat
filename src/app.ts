import express, { Request, Response, NextFunction } from "express";
import logger from "./logger";

import { morganLogger } from "./middleware/morganLogger";
import { userPreferencesMiddleware } from "./middleware/userPreferencesMiddleware";
import cookieParser from "cookie-parser";
import { CustomRequest } from "./types/request";
import todoRoutes from "./routes/todoRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerSpec";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morganLogger());
app.use(cookieParser());
app.use(userPreferencesMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routers
app.get("/", (req, res) => {
  logger.info("some message");
  res.json({ message: "Hello World" });
});

app.use("/todos", todoRoutes);

app.get("/status", (req, res) => {
  res.json({ status: process.env.NODE_ENV, app_name: process.env.APP_NAME });
});

app.get("/preference", (req, res) => {
  // Check if userPreferences are set
  if (req.userPreferences) {
    res.json(req.userPreferences);
  } else {
    // Handle the case where preferences are not available
    res.status(404).json({ message: "User preferences not found" });
  }
});

app.post("/login", (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;

  // Custom validation logic
  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).send("Invalid request body");
    return;
  }

  // Your login logic here

  res.json({
    username,
    password,
  });
});

// Basic Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
