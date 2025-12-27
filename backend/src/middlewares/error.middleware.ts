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

  if (err.message === "Email already exists") {
    return res.status(409).json({
      status: "error",
      message: "El email ya está registrado",
    });
  }

  if (err.message === "Invalid credentials") {
    return res.status(401).json({
      status: "error",
      message: "Credenciales inválidas",
    });
  }

  if (err.message === "Account is deactivated") {
    return res.status(403).json({
      status: "error",
      message: "La cuenta está desactivada",
    });
  }

  if (err.message === "User not found") {
    return res.status(404).json({
      status: "error",
      message: "Usuario no encontrado",
    });
  }

  if (err.message === "Current password is incorrect") {
    return res.status(400).json({
      status: "error",
      message: "La contraseña actual es incorrecta",
    });
  }

  if (err.message === "Token inválido o expirado") {
    return res.status(401).json({
      status: "error",
      message: "Token inválido o expirado",
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
