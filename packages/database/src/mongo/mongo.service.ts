import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class MongoService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Implement methods for CRUD operations
}
