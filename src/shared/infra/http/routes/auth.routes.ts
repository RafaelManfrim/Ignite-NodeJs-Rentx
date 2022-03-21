import { Router } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "../../../../modules/accounts/services/user/AuthenticateUserService";
import { RefreshTokenService } from "../../../../modules/accounts/services/user/RefreshTokenService";

const authRoutes = Router();

authRoutes.post("/session", async (req, res) => {
  const { password, email } = req.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);

  const authInfo = await authenticateUserService.execute({ password, email });

  return res.json(authInfo);
});

authRoutes.post("/refresh_token", async (req, res) => {
  const token =
    req.body.token || req.headers["x-access-token"] || req.query.token;

  const refreshTokenService = container.resolve(RefreshTokenService);
  const tokens = await refreshTokenService.execute(token);

  return res.json(tokens);
});

export { authRoutes };
