import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import configureSwagger from "./config/swagger";
import routes from "./routes/index";
import Auth from "./middlewares/Auth";

const API_BASE = process.env.API_BASE || "/api";
const PORT = process.env.PORT || 3000;

const app = express();

new PrismaClient();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (_request: Request, response: Response) =>
  response.redirect("/api"),
);

configureSwagger(API_BASE, app);

app.all(`${API_BASE}*`, (req, res, next) => {
  const publicRoutes = [
    "/api",
    "/api/api-docs",
    "/api/auth/login",
    "/api/auth/refresh-token",
  ];

  for (const route of publicRoutes) {
    if (req.path.replace(/\/$/, "") === route) {
      return next();
    }
  }
  Auth(req, res, next);
});

app.use(API_BASE, routes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}${API_BASE}\n`);
  console.log(
    `Swagger documentation: http://localhost:${PORT}${API_BASE}/api-docs`,
  );
});
