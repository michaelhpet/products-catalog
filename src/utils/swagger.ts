import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products Catalog API",
      version: "1.0.0",
      description: "API documentation for the Products Catalog service",
    },
    servers: [{ url: "http://localhost:8000" }],
  },
  apis: [path.resolve(__dirname, "../app/**/docs.{ts,js}")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
