import { Types } from "mongoose";
import userModel from "../schemas/auth.schema";
import petModel from "../schemas/pets.schema";
import cloudinaryService from "../services/cloudinary.service";
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
    const pet = await petModel.findById({ _id: id });

    if (!pet) {
      throw new Error("Pet not found");
    }

    if (pet.images && pet.images.length > 0) {
      const publicIds = pet.images.map((image) => image.publicId);
      await cloudinaryService.deleteMultipleImages(publicIds);
    }

    await petModel.findByIdAndDelete({ _id: id });
    return pet;
  }

  async uploadPetImages(
    petId: string | Types.ObjectId,
    files: Express.Multer.File[]
  ) {
    const pet = await petModel.findById(petId);

    if (!pet) {
      throw new Error("Pet not found");
    }

    if (!files || files.length === 0) {
      throw new Error("No images provided");
    }

    const uploadedImages = await cloudinaryService.uploadMultipleImages(files);

    if (!pet.images) {
      pet.images = [];
    }

    pet.images.push(...uploadedImages);
    await pet.save();

    return pet;
  }

  async deletePetImage(petId: string | Types.ObjectId, imagePublicId: string) {
    const pet = await petModel.findById(petId);

    if (!pet) {
      throw new Error("Pet not found");
    }

    if (!pet.images || pet.images.length === 0) {
      throw new Error("Pet has no images");
    }

    const imageIndex = pet.images.findIndex(
      (img) => img.publicId === imagePublicId
    );

    if (imageIndex === -1) {
      throw new Error("Image not found");
    }

    await cloudinaryService.deleteImage(imagePublicId);

    pet.images.splice(imageIndex, 1);
    await pet.save();

    return pet;
  }

  async adopt(petId: string | Types.ObjectId, userId: string | Types.ObjectId) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const existingPet = await petModel.findById(petId);

    if (!existingPet) {
      throw new Error("Pet not found");
    }

    if (existingPet.adopted) {
      throw new Error("Pet already adopted");
    }

    const pet = await petModel.findByIdAndUpdate(
      petId,
      { adopted: true, adoptedBy: user._id },
      { new: true }
    );

    return pet;
  }
}

export default new PetsModel();
