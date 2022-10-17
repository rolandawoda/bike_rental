import catchError from "@utils/catchError";
import userService from "./user.service";
import { IGetUserInfoRequest } from "@middlewares/authentication";

const registerUser = catchError(async (req, res) => {
  const data = { ...req.body };
  const user = await userService.registerUser(data);
  res.status(201).json({
    status: "success",
    message: "Registration successful",
  });
});

const loginUser = catchError(async (req, res) => {
  const { email, password }: { email: string; password: string } = {
    ...req.body,
  };

  const token = await userService.loginUser(email, password);

  res.status(201).json({
    status: "success",
    message: "login successful",
    data: {
      token,
    },
  });
});

const getUser = catchError(async (req: IGetUserInfoRequest, res) => {
  let user = await userService.getUser(req.userID);

  res.status(201).json({
    status: "success",
    message: "User profile",
    data: {
      user,
    },
  });
});

const getUsers = catchError(async (req: IGetUserInfoRequest, res) => {
  let users = await userService.getUsers();

  res.status(200).json({
    status: "success",
    message: "users",
    data: {
      users,
    },
  });
});

const deleteUser = catchError(async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    data: null,
  });
});

const updateUser = catchError(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = await userService.updateUser(id, data);

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: user,
  });
});

export { getUsers, getUser, registerUser, loginUser, deleteUser, updateUser };
