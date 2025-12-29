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

  return generator.generateDocument({
    openapi: "3.0.3",
    info: {
      title: "Rescue Connect API",
      version: "1.0.0",
      description: "API REST con Node.js, Express, TS y MongoDB",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  });
};

export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiHandler: RequestHandler = (req, res, next) => {
  const document = generateOpenApiDocument();
  return swaggerUi.setup(document)(req, res, next);
};
