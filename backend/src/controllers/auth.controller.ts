import { Request, Response, NextFunction } from "express";
import authModel from "../models/auth.model";
import { JWTUtils } from "../utils/jwt.utils";
import { IAuthResponse, IUserResponse } from "../types/user.types";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, phone, address } = req.body;

      const user = await authModel.register({
        email,
        password,
        firstName,
        lastName,
        phone,
        address,
      });

      const token = JWTUtils.generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const userResponse: IUserResponse = {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      const response: IAuthResponse = {
        user: userResponse,
        tokens: {
          accessToken: token,
        },
      };

      res.status(201).json({
        status: "success",
        message: "Usuario registrado exitosamente",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await authModel.login(email, password);

      const token = JWTUtils.generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const userResponse: IUserResponse = {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      const response: IAuthResponse = {
        user: userResponse,
        tokens: {
          accessToken: token,
        },
      };

      res.status(200).json({
        status: "success",
        message: "Login exitoso",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const user = await authModel.findById(req.user.userId);

      const userResponse: IUserResponse = {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.status(200).json({
        status: "success",
        data: { user: userResponse },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const { firstName, lastName, email, phone, address } = req.body;

      const user = await authModel.updateUser(req.user.userId, {
        firstName,
        lastName,
        email,
        phone,
        address,
      });

      const userResponse: IUserResponse = {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.status(200).json({
        status: "success",
        message: "Perfil actualizado exitosamente",
        data: { user: userResponse },
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "No autenticado",
        });
      }

      const { currentPassword, newPassword } = req.body;

      await authModel.changePassword(
        req.user.userId,
        currentPassword,
        newPassword
      );

      res.status(200).json({
        status: "success",
        message: "Contraseña cambiada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  // TODO: remove function when implementing it on the client
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        status: "success",
        message: "Logout exitoso",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
