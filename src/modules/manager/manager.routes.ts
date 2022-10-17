import validate from "@middlewares/validation";
import { Router } from "express";
import {logingManager, registerManager} from './manager.controller'
import { validateCreateManager, validateLoginManager } from "./manager.validation";

const router = Router();
router.post('/auth/register', validate(validateCreateManager), registerManager)
router.post('/auth/login', validate(validateLoginManager), logingManager)

export { router as managerRouter };
