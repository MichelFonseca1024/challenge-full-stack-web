import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import { configureEnvironment } from "./config/environment";
import configureSwagger from "./config/swagger";
import routes from "./routes/index";

configureEnvironment();

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
app.use(API_BASE, routes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}${API_BASE}\n`);
  console.log(
    `Swagger documentation: http://localhost:${PORT}${API_BASE}/api-docs`,
  );
});
