import { Types } from "mongoose";
import petModel from "../schemas/pets.schema";
import cloudinaryService from "../services/cloudinary.service";
import {
  IPet,
  IPetQueryParams,
  IPaginatedResponse,
  IPetDocument,
} from "../types/pet.types";

class PetsModel {
  async getAll(queryParams: IPetQueryParams) {
    const {
      page,
      limit,
      sortBy,
      order,
      adopted,
      type,
      gender,
      size,
      isSterilized,
      isVaccinated,
      minAge,
      maxAge,
      search,
    } = queryParams;
    const filter: any = {};

    if (adopted !== undefined) filter.adopted = adopted;
    if (type) filter.type = type;
    if (gender) filter.gender = gender;
    if (size) filter.size = size;
    if (isSterilized !== undefined) filter.isSterilized = isSterilized;
    if (isVaccinated !== undefined) filter.isVaccinated = isVaccinated;

    if (minAge !== undefined || maxAge !== undefined) {
      const now = new Date();

      if (minAge !== undefined) {
        const maxBirthDate = new Date(
          now.getFullYear() - minAge,
          now.getMonth(),
          now.getDate()
        );
        filter.birthDate = { ...filter.birthDate, $lte: maxBirthDate };
      }

      if (maxAge !== undefined) {
        const minBirthDate = new Date(
          now.getFullYear() - maxAge - 1,
          now.getMonth(),
          now.getDate()
        );
        filter.birthDate = { ...filter.birthDate, $gt: minBirthDate };
      }
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const sortOrder = order === "asc" ? 1 : -1;
    const sort: any = { [sortBy]: sortOrder };

    const [data, totalItems] = await Promise.all([
      petModel.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      petModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    const response: IPaginatedResponse<IPetDocument> = {
      data: data as IPetDocument[],
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

    return response;
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
}

export default new PetsModel();
