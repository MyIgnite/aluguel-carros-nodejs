import { NextFunction, Request, Response, Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

function teste(request: Request, response: Response, next: NextFunction) {
  console.log(request.method)
  next()
}

const router = Router();

router.use(authenticateRoutes);
router.use(ensureAuthenticated);

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export { router };
