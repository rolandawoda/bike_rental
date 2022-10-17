import { Router } from "express";

import validate from "@middlewares/validation";
import { authenticateUser } from "@middlewares/authentication";
import {
  validateUserCreation,
  validateUserLogin,
  validateUpdateUser,
} from "./user.validation";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} from "./user.controller";

const router = Router();

// user authentication
router.post("/auth/register", validate(validateUserCreation), registerUser);
router.post("/auth/login", validate(validateUserLogin), loginUser);
router.post("/auth", authenticateUser, getUser);

//user management
router.put("/:id", authenticateUser, validate(validateUpdateUser), updateUser);

export { router as userRouter };
