import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../docs/swagger.json";

const configureSwagger = (apiBase: string, app: Application) => {
  app.use(`${apiBase}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default configureSwagger;
