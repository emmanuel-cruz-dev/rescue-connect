import { Types } from "mongoose";
import userModel from "../schemas/user.schema";
import authModel from "./auth.model";
import adoptionRequestModel from "../schemas/adoption.schema";
import {
  IUser,
  IUserQueryParams,
  IUserDocument,
  IUserResponse,
  IPaginatedResponse,
} from "../types";
import petsModel from "../schemas/pets.schema";

const PUBLIC_FIELDS = "-password";

class UsersModel {
  async getAll(
    queryParams: IUserQueryParams
  ): Promise<IPaginatedResponse<IUserResponse>> {
    const { page, limit, sortBy, order, role, isActive, search } = queryParams;

    const filter: any = {};

    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive;

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const sortOrder = order === "asc" ? 1 : -1;
    const sort: any = {};
    if (sortBy) sort[sortBy] = sortOrder;

    const [data, totalItems] = await Promise.all([
      userModel
        .find(filter)
        .select(PUBLIC_FIELDS)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      userModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limitNumber);

    return {
      data: data as unknown as IUserResponse[],
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems,
        itemsPerPage: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1,
      },
    };
  }

  async findById(id: string | Types.ObjectId): Promise<IUserDocument> {
    return authModel.findById(id.toString());
  }

  async create(userData: IUser): Promise<IUserResponse> {
    const existing = await userModel.findOne({ email: userData.email });
    if (existing) {
      throw new Error("El email ya está registrado");
    }

    const user = await userModel.create(userData);
    const { password: _, ...userResponse } = user.toObject();
    return userResponse as unknown as IUserResponse;
  }

  async update(
    id: string | Types.ObjectId,
    userData: Partial<Omit<IUser, "password">>
  ): Promise<IUserResponse> {
    if ((userData as any).email) {
      const existing = await userModel.findOne({
        email: (userData as any).email,
        _id: { $ne: id },
      });
      if (existing) {
        throw new Error("El email ya está en uso por otro usuario");
      }
    }

    const user = await authModel.updateUser(id.toString(), userData);
    const { password: _, ...userResponse } = user.toObject();
    return userResponse as unknown as IUserResponse;
  }

  async updatePassword(
    id: string | Types.ObjectId,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await authModel.changePassword(id.toString(), currentPassword, newPassword);
  }

  async deactivate(id: string | Types.ObjectId): Promise<IUserDocument> {
    return authModel.deactivateUser(id.toString());
  }

  async count(filter: Partial<IUser> = {}): Promise<number> {
    return userModel.countDocuments(filter);
  }

  async delete(id: string | Types.ObjectId): Promise<IUserDocument> {
    await adoptionRequestModel.deleteMany({
      userId: id,
      status: { $in: ["pending", "cancelled", "rejected"] },
    });

    await adoptionRequestModel.updateMany(
      { userId: id, status: "approved" },
      { $set: { userId: null } }
    );

    await petsModel.updateMany(
      { adoptedBy: id },
      { $set: { adoptedBy: null } }
    );

    const user = await userModel
      .findByIdAndDelete({ _id: id })
      .select(PUBLIC_FIELDS);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new UsersModel();
