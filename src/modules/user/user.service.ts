import User from "./user.model";
import { IUser } from "./user.interface";
import CustomError from "@utils/CustomError.class";

const getUser: (id: string) => Promise<IUser> = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new CustomError(404, "User not found");
  return user.removeSensitiveData();
};

const getUsers: () => Promise<IUser[]> = async () => {
  return await User.find().select(['-password']);
};

const deleteUser: (id: string) => Promise<void> = async (id) => {
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) throw new CustomError(404, "User not found");
};

const updateUser: (id: string, data: IUser) => Promise<IUser> = async (
  id,
  data
) => {
  delete data.password;
  const user = await User.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (!user) throw new CustomError(404, "User not found");

  return user.removeSensitiveData();
};

const registerUser: (data: IUser) => Promise<any> = async (data) => {
  let check = await User.findOne({ email: data.email });
  if (check) {
    throw new CustomError(401, "User with this email already exists");
  }

  let save = await User.create(data);
};

const loginUser: (email: string, password: string) => Promise<string> = async (
  email,
  password
) => {
  let user = await User.findByCredentials(email, password);

  const token = User.generateAuthToken(user._id, user.email);

  return token;
};

export default {
  getUser,
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};
