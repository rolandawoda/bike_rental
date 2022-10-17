import { Router, IRouter } from "express";

import { managerRouter } from "./manager/manager.routes";

const getRoutes = (): IRouter => {
  const router = Router();

  router.use("/manager", managerRouter);

  return router;
};

export { getRoutes };
