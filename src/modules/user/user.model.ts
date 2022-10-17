import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUser, IUserModel } from "./user.interface";
import config from "@config/config";
import CustomError from "@utils/CustomError.class";

const userSchema = new Schema<IUser>(
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

userSchema.pre("save", async function (this: IUser) {
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.removeSensitiveData = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.generateAuthToken = function (id, email) {
  const token = jwt.sign({ _id: id, email: email }, config.jwt.secret);
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new CustomError(404, "Invalid login credentials");

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new CustomError(404, "Invalid login credentials");

  return user;
};

const User = (mongoose.models["User"] ||
  mongoose.model<IUser, IUserModel>("User", userSchema)) as IUserModel;

export default User;
