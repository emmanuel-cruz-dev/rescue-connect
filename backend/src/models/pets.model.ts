import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.config";

interface Pet {
  id: ObjectId;
  name: string;
  type: string;
  age: number;
  breed: string;
}

class PetsModel {
  async create(pet: Pet) {
    try {
      const db = await dbClient.ensureConnection();
      const newPet = await db.collection("pets").insertOne(pet);
      return newPet;
    } catch (err) {
      console.error("Error creating pet", err);
      throw new Error("Error creating pet");
    }
  }

  async getAll() {
    try {
      const db = await dbClient.ensureConnection();
      const pets = await db.collection("pets").find().toArray();
      return pets;
    } catch (err) {
      console.error("Error getting all pets", err);
      throw new Error("Error getting all pets");
    }
  }

  async findById(id: string) {
    try {
      const db = await dbClient.ensureConnection();
      const pet = await db.collection("pets").findOne({ id: id });
      return pet;
    } catch (err) {
      console.error("Error finding pet by id", err);
      throw new Error("Error finding pet by id");
    }
  }

  async update(id: string, pet: Pet) {
    try {
      const db = await dbClient.ensureConnection();
      const updatedPet = await db
        .collection("pets")
        .updateOne({ id: id }, { $set: pet });
      return updatedPet;
    } catch (err) {
      console.error("Error updating pet", err);
      throw new Error("Error updating pet");
    }
  }

  async delete(id: string) {
    try {
      const db = await dbClient.ensureConnection();
      const deletedPet = await db.collection("pets").deleteOne({ id: id });
      return deletedPet;
    } catch (err) {
      console.error("Error deleting pet", err);
      throw new Error("Error deleting pet");
    }
  }
}

export default new PetsModel();
