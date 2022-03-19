import { Router } from "express";
import { container } from "tsyringe";

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

export { forgotPasswordRoutes };
