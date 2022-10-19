import { authenticateUser } from "@middlewares/authentication";
import validate from "@middlewares/validation";
import { Router } from "express";
import { createReservation, getReservations, getUserReservation, updateReservation } from "./reservation.controller";
import { validateCreateReservation, validateUpdateReservation } from "./reservation.validation";

const router = Router();

// /api/reservation
router.post('/', authenticateUser, validate(validateCreateReservation), createReservation)
router.get('/', authenticateUser, getUserReservation)
router.put('/:id', authenticateUser, validate(validateUpdateReservation), updateReservation)

export { router as reservationRouter };