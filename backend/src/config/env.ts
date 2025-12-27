import { SignOptions } from "jsonwebtoken";

export const config = {
  jwtSecret: process.env.JWT_SECRET || "default_secret_change_this",
  jwtExpiresIn:
    (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h",
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "10"),
};
