import { Router } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordService } from "../../../../modules/accounts/services/password/ResetUserPasswordService";
import { SendForgotPasswordMailService } from "../../../../modules/accounts/services/password/SendForgotPasswordMailService";

const forgotPasswordRoutes = Router();

forgotPasswordRoutes.post("/", async (req, res) => {
  const { email } = req.body;

  const sendForgotPasswordMailService = container.resolve(
    SendForgotPasswordMailService
  );

  await sendForgotPasswordMailService.execute(email);

  return res.send();
});

forgotPasswordRoutes.post("/reset", async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  const resetUserPasswordService = container.resolve(ResetUserPasswordService);

  await resetUserPasswordService.execute(String(token), password);

  return res.send();
});

export { forgotPasswordRoutes };
