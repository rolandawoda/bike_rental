import { authenticateManager } from "@middlewares/authentication";
import validate from "@middlewares/validation";
import { Router } from "express";
import {
  getManager,
  getManagers,
  logingManager,
  registerManager,
  deleteManager,
  updateManager,
} from "./manager.controller";
import {
  validateCreateManager,
  validateLoginManager,
  validateUpdateManager,
} from "./manager.validation";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../user/user.controller";

const router = Router();

// /api/manager/auth
router.post("/auth/register", validate(validateCreateManager), registerManager);
router.post("/auth/login", validate(validateLoginManager), logingManager);
router.get("/auth", authenticateManager, getManager);

// /api/manager/
router.get("/", authenticateManager, getManagers);
router.delete("/:id", authenticateManager, deleteManager);
router.put(
  "/:id",
  authenticateManager,
  validate(validateUpdateManager),
  updateManager
);

// /api/manager/users
router.get("/users", authenticateManager, getUsers);
router.get("/users/id", authenticateManager, getUser);
router.put("/users/id", authenticateManager, updateUser);
router.delete("/users/id", authenticateManager, deleteUser);

export { router as managerRouter };
