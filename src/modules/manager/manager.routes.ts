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
  getUserById,
  deleteUser,
  updateUser,
} from "../user/user.controller";
import { createBike, deleteBike, getBike, getBikes, updateBike } from "modules/bike/bike.controller";
import { validateCreateBike } from "modules/bike/bike.validation";
import { getReservation, getReservations, managerUpdateReservation, updateReservation } from "modules/reservation/reservation.controller";
import { validateUpdateReservation } from "modules/reservation/reservation.validation";

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
router.get("/users/:id", authenticateManager, getUserById);
router.put("/users/:id", authenticateManager, updateUser);
router.delete("/users/:id", authenticateManager, deleteUser);

// /api/manager/bikes
router.post("/bikes", validate(validateCreateBike), authenticateManager, createBike);
router.get("/bikes", authenticateManager, getBikes);
router.get("/bikes/:id", authenticateManager, getBike);
router.delete("/bikes/:id", authenticateManager, deleteBike);
router.put("/bikes/:id", validate(validateCreateBike), authenticateManager, updateBike);

// /api/manager/reservations
// ?user_id=1 & bike_id=1
router.get("/reservations", authenticateManager, getReservations);
router.get("/reservations/:id", authenticateManager, getReservation);
router.put('/reservations/:id', authenticateManager, validate(validateUpdateReservation), managerUpdateReservation)
export { router as managerRouter };
