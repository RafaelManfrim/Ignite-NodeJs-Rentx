import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authRoutes } from "./auth.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./user.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/session", authRoutes);

router.use("/users", usersRoutes);

router.use(ensureAuthenticated);

router.use("/cars", carRoutes);

router.use("/user", userRoutes);

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationsRoutes);

export { router };
