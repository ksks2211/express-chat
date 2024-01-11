import morgan from "morgan";

export const morganLogger = () => {
  return process.env.NODE_ENV === "development"
    ? morgan("dev")
    : morgan("combined");
};
