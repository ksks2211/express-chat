import { UserPreferences } from "./userPreferences";
// src/types/global.d.ts

declare global {
  namespace Express {
    interface Request {
      userPreferences?: UserPreferences;
    }
  }
}

export {}; // This line is necessary to make this a module
