// src/middleware/userPreferencesMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { UserPreferences } from "../types/userPreferences";

function getUserPreferences(req: Request, res: Response): UserPreferences {
  // Default values
  const defaultLang = "en";
  const defaultLocation = "us";

  // Check and set the 'lang' cookie
  let lang = req.cookies["lang"];
  if (!lang) {
    lang = defaultLang;
    res.cookie("lang", defaultLang, { httpOnly: true }); // Update the response to set the cookie
  }

  // Check and set the 'location' cookie
  let location = req.cookies["location"];
  if (!location) {
    location = defaultLocation;
    res.cookie("location", defaultLocation, { httpOnly: true }); // Update the response to set the cookie
  }
  return {
    lang,
    location,
  };
}

export function userPreferencesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userPreferences = getUserPreferences(req, res);
  // Set the user preferences in the request
  req.userPreferences = userPreferences;

  next();
}
