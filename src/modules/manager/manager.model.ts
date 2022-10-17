import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IManager, IManagerModel } from "./manager.interface";
import config from "@config/config";
import CustomError from "@utils/CustomError.class";

const managerSchema = new Schema<IManager>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowerCase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

managerSchema.pre("save", async function (this: IManager) {
  this.password = await bcrypt.hash(this.password, 8);
});

managerSchema.methods.removeSensitiveData = function () {
  const manager = this.toObject()
  delete manager.password
  return manager
}


managerSchema.statics.generateAuthToken = function (id, email) {
  const token = jwt.sign({ _id: id, email: email }, config.jwt.secret);
  return token;
};

managerSchema.statics.findByCredentials = async (email, password) => {
  const manager = await Manager.findOne({ email }).select("+password");

  if (!manager) throw new CustomError(404, "Invalid login credentials");

  const isPasswordMatch = await bcrypt.compare(password, manager.password);

  if (!isPasswordMatch) throw new CustomError(404, "Invalid login credentials");

  return manager;
};

const Manager = (mongoose.models["Manager"] ||
  mongoose.model<IManager, IManagerModel>(
    "Manager",
    managerSchema
  )) as IManagerModel;

export default Manager;
