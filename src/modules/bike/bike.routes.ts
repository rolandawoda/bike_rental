import {Router} from 'express'
import { getBikes, getBike } from './bike.controller';

const router = Router();
// api/bikes
router.get("/",  getBikes);
router.get("/:id",  getBike);

export { router as bikeRouter };