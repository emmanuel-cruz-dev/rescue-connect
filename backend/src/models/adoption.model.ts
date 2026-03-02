import { Types } from "mongoose";
import adoptionRequestModel from "../schemas/adoption.schema";
import petModel from "../schemas/pets.schema";
import userModel from "../schemas/auth.schema";
import {
  AdoptionStatus,
  IAdoptionQueryParams,
  IPaginatedResponse,
  IAdoptionRequestDocument,
} from "../types";

class AdoptionModel {
  async getAll(queryParams: IAdoptionQueryParams) {
    const {
      page,
      limit,
      sortBy,
      order,
      status,
      petId,
      userId,
      reviewedBy,
      fromDate,
      toDate,
    } = queryParams;

    const filter: any = {};

    if (status) filter.status = status;
    if (petId) filter.petId = new Types.ObjectId(petId as string);
    if (userId) filter.userId = new Types.ObjectId(userId as string);
    if (reviewedBy)
      filter.reviewedBy = new Types.ObjectId(reviewedBy as string);

    if (fromDate !== undefined || toDate !== undefined) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = fromDate;
      if (toDate) filter.createdAt.$lte = toDate;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const sortOrder = order === "asc" ? 1 : -1;
    const sort: any = {};
    if (sortBy) sort[sortBy] = sortOrder;

    const [data, totalItems] = await Promise.all([
      adoptionRequestModel
        .find(filter)
        .populate("petId", "name type breed images")
        .populate("userId", "name email")
        .populate("reviewedBy", "name email")
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      adoptionRequestModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limitNumber);

    const response: IPaginatedResponse<IAdoptionRequestDocument> = {
      data: data as IAdoptionRequestDocument[],
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems,
        itemsPerPage: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1,
      },
    };

    return response;
  }

  async createRequest(
    petId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
    message?: string
  ) {
    const pet = await petModel.findById(petId);
    if (!pet) {
      throw new Error("Pet not found");
    }
    if (pet.adopted) {
      throw new Error("Pet already adopted");
    }

    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const existingRequest = await adoptionRequestModel.findOne({
      petId,
      userId,
      status: "pending",
    });

    if (existingRequest) {
      throw new Error(
        "You already have a pending adoption request for this pet"
      );
    }

    const request = await adoptionRequestModel.create({
      petId,
      userId,
      message,
      status: "pending",
    });

    return await request.populate([
      { path: "petId", select: "name type breed images" },
      { path: "userId", select: "name email" },
    ]);
  }

  async getUserRequests(
    userId: string | Types.ObjectId,
    status?: AdoptionStatus
  ) {
    const filter: any = { userId };
    if (status) {
      filter.status = status;
    }

    return await adoptionRequestModel
      .find(filter)
      .populate("petId", "name type breed images")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
  }

  async getPetRequests(petId: string | Types.ObjectId) {
    return await adoptionRequestModel
      .find({ petId })
      .populate("userId", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
  }

  async getRequestById(requestId: string | Types.ObjectId) {
    const request = await adoptionRequestModel
      .findById(requestId)
      .populate("petId", "name type breed images")
      .populate("userId", "name email")
      .populate("reviewedBy", "name email");

    if (!request) {
      throw new Error("Adoption request not found");
    }

    return request;
  }

  async approveRequest(
    requestId: string | Types.ObjectId,
    adminId: string | Types.ObjectId,
    adminNotes?: string
  ) {
    const request = await adoptionRequestModel.findById(requestId);

    if (!request) {
      throw new Error("Adoption request not found");
    }

    if (request.status !== "pending") {
      throw new Error("Only pending requests can be approved");
    }

    const pet = await petModel.findById(request.petId);
    if (!pet) {
      throw new Error("Pet not found");
    }
    if (pet.adopted) {
      throw new Error("Pet has already been adopted");
    }

    await petModel.findByIdAndUpdate(request.petId, {
      adopted: true,
      adoptedBy: request.userId,
    });

    request.status = "approved";
    request.reviewedBy = new Types.ObjectId(adminId);
    request.reviewedAt = new Date();
    if (adminNotes) {
      request.adminNotes = adminNotes;
    }
    await request.save();

    await adoptionRequestModel.updateMany(
      { petId: request.petId, status: "pending", _id: { $ne: requestId } },
      {
        status: "rejected",
        reviewedBy: adminId,
        reviewedAt: new Date(),
        adminNotes: "La mascota fue adoptada por otro usuario",
      }
    );

    return await request.populate([
      { path: "petId", select: "name type breed images" },
      { path: "userId", select: "name email" },
      { path: "reviewedBy", select: "name email" },
    ]);
  }

  async rejectRequest(
    requestId: string | Types.ObjectId,
    adminId: string | Types.ObjectId,
    adminNotes?: string
  ) {
    const request = await adoptionRequestModel.findById(requestId);

    if (!request) {
      throw new Error("Adoption request not found");
    }

    if (request.status !== "pending") {
      throw new Error("Only pending requests can be rejected");
    }

    request.status = "rejected";
    request.reviewedBy = new Types.ObjectId(adminId);
    request.reviewedAt = new Date();
    if (adminNotes) {
      request.adminNotes = adminNotes;
    }
    await request.save();

    return await request.populate([
      { path: "petId", select: "name type breed images" },
      { path: "userId", select: "name email" },
      { path: "reviewedBy", select: "name email" },
    ]);
  }

  async cancelRequest(
    requestId: string | Types.ObjectId,
    userId: string | Types.ObjectId
  ) {
    const request = await adoptionRequestModel.findById(requestId);

    if (!request) {
      throw new Error("Adoption request not found");
    }

    if (request.userId.toString() !== userId.toString()) {
      throw new Error("You can only cancel your own requests");
    }

    if (request.status !== "pending") {
      throw new Error("Only pending requests can be cancelled");
    }

    request.status = "cancelled";
    await request.save();

    return await request.populate([
      { path: "petId", select: "name type breed images" },
      { path: "userId", select: "name email" },
    ]);
  }
}

export default new AdoptionModel();
