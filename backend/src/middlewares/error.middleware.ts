import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof MongooseError.ValidationError) {
    return res.status(400).json({
      status: "error",
      message: "Error de validación",
      errors: Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({
      status: "error",
      message: "ID inválido",
    });
  }

  if (err.name === "MongoServerError" && (err as any).code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Ya existe un registro con esos datos",
    });
  }

  if (err.message === "Pet not found") {
    return res.status(404).json({
      status: "error",
      message: "Mascota no encontrada",
    });
  }

  res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
};
