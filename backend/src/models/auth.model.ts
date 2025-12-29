import userModel from "../schemas/auth.schema";
import { IUser, IUserDocument } from "../types/user.types";

class AuthModel {
  async register(
    userData: Pick<
      IUser,
      "email" | "password" | "firstName" | "lastName" | "phone" | "address"
    >
  ): Promise<IUserDocument> {
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const user = await userModel.create(userData);
    return user;
  }

  async login(email: string, password: string): Promise<IUserDocument> {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  async findById(id: string) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findByEmail(email: string) {
    return await userModel.findOne({ email });
  }

  async updateUser(id: string, userData: Partial<IUser>) {
    const user = await userModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await userModel.findById(userId).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return user;
  }

  async deactivateUser(id: string) {
    const user = await userModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new AuthModel();
