import { Router } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "../modules/accounts/services/AuthenticateUserService";

const authRoutes = Router();

authRoutes.post("/", async (req, res) => {
  const { password, email } = req.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);

  const authInfo = await authenticateUserService.execute({ password, email });

  return res.json(authInfo);
});

export { authRoutes };
