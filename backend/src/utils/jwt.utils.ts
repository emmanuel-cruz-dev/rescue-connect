import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { IJWTPayload } from "../types/user.types";

export class JWTUtils {
  static generateToken(payload: IJWTPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }

  static verifyToken(token: string): IJWTPayload {
    try {
      return jwt.verify(token, config.jwtSecret) as IJWTPayload;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }
}
