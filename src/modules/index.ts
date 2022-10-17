import { Router, IRouter } from "express";

import { managerRouter } from "./manager/manager.routes";
import { userRouter } from "./user/user.routes";

const getRoutes = (): IRouter => {
  const router = Router();

  router.use("/manager", managerRouter);
  router.use("/user", userRouter);

  return router;
};

export { getRoutes };
