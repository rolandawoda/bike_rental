import { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  removeSensitiveData: () => IUser;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials: (email: string, password: string) => IUser;
  generateAuthToken: (id: string, email: string) => string;
}
