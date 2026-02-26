import swaggerUi from "swagger-ui-express";
import { z } from "zod";
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { RequestHandler } from "express";

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

export const generateOpenApiDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  const isProduction = process.env.NODE_ENV === "production";

  const servers = isProduction
    ? [
        { url: "https://rescue-connect-kkfo.onrender.com" },
        { url: "http://localhost:3000" },
      ]
    : [
        { url: "http://localhost:3000" },
        { url: "https://rescue-connect-kkfo.onrender.com" },
      ];

  return generator.generateDocument({
    openapi: "3.0.3",
    info: {
      title: "Rescue Connect API",
      version: "1.0.0",
      description: "API REST con Node.js, Express, TS y MongoDB",
    },
    servers,
  });
};

export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiHandler: RequestHandler = (req, res, next) => {
  const document = generateOpenApiDocument();
  return swaggerUi.setup(document)(req, res, next);
};
