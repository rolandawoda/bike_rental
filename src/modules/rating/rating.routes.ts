import { authenticateUser } from "@middlewares/authentication";
import validate from "@middlewares/validation";
import { Router } from "express";
import { createRating } from "./rating.controller";
import { validateCreateRating } from "./rating.validation";

const router = Router();
// api/ratings
router.post("/", authenticateUser,validate(validateCreateRating), createRating)

export { router as ratingRouter };