import dotenv from "dotenv";

export const configureEnvironment = (): void => {
  dotenv.config({
    path:
      process.env.NODE_ENV === "test"
        ? "src/config/env/.env.test"
        : "src/config/env/.env",
  });
};
