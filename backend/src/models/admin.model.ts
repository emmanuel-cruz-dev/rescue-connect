import userModel from "../schemas/user.schema";
import petModel from "../schemas/pets.schema";
import adoptionRequestModel from "../schemas/adoption.schema";

class AdminModel {
  async getDashboardStats() {
    const [
      usersCount,
      petsCount,
      adoptedPetsCount,
      availablePetsCount,
      pendingRequestsCount,
      approvedRequestsCount,
      rejectedRequestsCount,
    ] = await Promise.all([
      userModel.countDocuments({}),
      petModel.countDocuments({}),
      petModel.countDocuments({ adopted: true }),
      petModel.countDocuments({ adopted: false }),
      adoptionRequestModel.countDocuments({ status: "pending" }),
      adoptionRequestModel.countDocuments({ status: "approved" }),
      adoptionRequestModel.countDocuments({ status: "rejected" }),
    ]);

    return {
      users: usersCount,
      pets: petsCount,
      adopted: adoptedPetsCount,
      availablePets: availablePetsCount,
      pendingRequests: pendingRequestsCount,
      approvedRequests: approvedRequestsCount,
      rejectedRequests: rejectedRequestsCount,
    };
  }
}

export default new AdminModel();
