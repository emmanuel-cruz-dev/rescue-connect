import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

interface IError extends Error {
  code?: string | number;
}

export const errorHandler = (
  err: IError,
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

  if (err.message === "Pet already adopted") {
    return res.status(400).json({
      status: "error",
      message: "La mascota ya ha sido adoptada",
    });
  }

  if (err.message === "Formato de imagen no válido. Use JPG, PNG o WEBP") {
    return res.status(400).json({
      status: "error",
      message: "Formato de imagen no válido. Use JPG, PNG o WEBP",
    });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      status: "error",
      message: "La imagen es demasiado grande. Máximo 5MB",
    });
  }

  if (err.message === "No images provided") {
    return res.status(400).json({
      status: "error",
      message: "No se han proporcionado imágenes",
    });
  }

  if (err.message === "Pet has no images") {
    return res.status(400).json({
      status: "error",
      message: "La mascota no tiene imágenes",
    });
  }

  if (err.message === "Image not found") {
    return res.status(404).json({
      status: "error",
      message: "Imagen no encontrada",
    });
  }

  if (err.message === "Only pending requests can be cancelled") {
    return res.status(403).json({
      status: "error",
      message: "Solo puedes cancelar solicitudes pendientes",
    });
  }

  if (err.message === "Only pending requests can be approved") {
    return res.status(403).json({
      status: "error",
      message: "Solo puedes aprobar solicitudes pendientes",
    });
  }

  if (err.message === "Only pending requests can be rejected") {
    return res.status(403).json({
      status: "error",
      message: "Solo puedes rechazar solicitudes pendientes",
    });
  }

  if (err.message === "You can only cancel your own requests") {
    return res.status(403).json({
      status: "error",
      message: "Solo puedes cancelar tus propias solicitudes",
    });
  }

  if (err.message === "You already have a pending adoption request for this pet") {
    return res.status(400).json({
      status: "error",
      message: "Ya tienes una solicitud pendiente para esta mascota",
    });
  }

  res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
};
