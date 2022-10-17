import Manager from "./manager.model";
import { IManager } from "./manager.interface";
import CustomError from "@utils/CustomError.class";

const getManager: (id: string) => Promise<IManager> = async (id) => {
  const manager = await Manager.findById(id);
  if (!manager) throw new CustomError(404, "Manager not found");
  return manager.removeSensitiveData();
};

const getManagers: () => Promise<IManager[]> = async () => {
  return await Manager.find().select(['-password']);
};

const deleteManager: (id: string) => Promise<void> = async (id) => {
  const manager = await Manager.findOneAndDelete({ id });
  if (!manager) throw new CustomError(404, "Manager not found");
};

const updateManager: (id: string, data: IManager) => Promise<IManager> = async (
  id,
  data
) => {
  delete data.password;
  const manager = await Manager.findOneAndUpdate({ id }, data, {
    new: true,
  });
  if (!manager) throw new CustomError(404, "Manager not found");

  return manager.removeSensitiveData();
};

const registerManager: (data: IManager) => Promise<any> = async (data) => {
  let check = await Manager.findOne({ email: data.email });
  if (check) {
    throw new CustomError(401, "Manager with this email already exist");
  }

  let save = await Manager.create(data);
};

const loginManager: (
  email: string,
  password: string
) => Promise<string> = async (email, password) => {
  let manager = await Manager.findByCredentials(email, password);

  if (!manager) throw new CustomError(401, "Invalid login crendentials");

  const token = Manager.generateAuthToken(manager._id, manager.email);

  return token;
};

export default {
  getManager,
  getManagers,
  registerManager,
  loginManager,
  deleteManager,
  updateManager,
};
