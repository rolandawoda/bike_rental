import { Router, IRouter } from "express";
import { bikeRouter } from "./bike/bike.routes";

import { managerRouter } from "./manager/manager.routes";
import { ratingRouter } from "./rating/rating.routes";
import { reservationRouter } from "./reservation/reservation.routes";
import { userRouter } from "./user/user.routes";

const getRoutes = (): IRouter => {
  const router = Router();

  router.use("/manager", managerRouter);
  router.use("/user", userRouter);
  router.use("/bikes", bikeRouter)
  router.use("/reservations", reservationRouter)
  router.use("/ratings", ratingRouter)

  return router;
};

export { getRoutes };
