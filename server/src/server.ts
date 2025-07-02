import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import { configureEnvironment } from "./config/environment";

configureEnvironment();

const API_BASE = process.env.API_BASE || "/api";
const PORT = process.env.PORT || 3000;

const app = express();

new PrismaClient();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (request: Request, response: Response) =>
  response.redirect("/api"),
);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}${API_BASE}`);
});
