import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use(ensureAuthenticated);

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export { router };
