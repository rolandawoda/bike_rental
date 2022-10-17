import { IManager, IManagerModel } from "./manager.interface";
import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema({ timestamps: true });

const Manager =
  mongoose.models["Manger"] ||
  mongoose.model<IManager, IManagerModel>("Manager", managerSchema);

export default Manager;
