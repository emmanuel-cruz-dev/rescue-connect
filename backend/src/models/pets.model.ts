import { Types } from "mongoose";
import petModel from "../schemas/pets.schema";
import { IPet } from "../types/pet.types";

class PetsModel {
  async getAll() {
    return await petModel.find();
  }

  async findById(id: string | Types.ObjectId) {
    const pet = await petModel.findById(id);

    if (!pet) {
      throw new Error("Pet not found");
    }
    return pet;
  }

  async create(petData: IPet) {
    return await petModel.create(petData);
  }

  async update(id: string | Types.ObjectId, petData: Partial<IPet>) {
    const pet = await petModel.findByIdAndUpdate({ _id: id }, petData, {
      new: true,
      runValidators: true,
    });

    if (!pet) {
      throw new Error("Pet not found");
    }
    return pet;
  }

  async delete(id: string | Types.ObjectId) {
    const pet = await petModel.findOneAndDelete({ _id: id });

    if (!pet) {
      throw new Error("Pet not found");
    }
    return pet;
  }
}

export default new PetsModel();
