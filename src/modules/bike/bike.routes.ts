import {Router} from 'express'
import { getBikes, getBike } from './bike.controller';

const router = Router();
// api/bikes
// ?color=red&model=tesla&longitude=5656&latitude=676767&rate=3&from=123&to=33
router.get("/",  getBikes);
router.get("/:id",  getBike);

export { router as bikeRouter };