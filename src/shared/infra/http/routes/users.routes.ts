import { Router } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "../../../../modules/accounts/services/user/CreateUserService";

const usersRoutes = Router();

usersRoutes.post("/", async (req, res) => {
  const { name, email, password, driver_license } = req.body;

  try {
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute({
      name,
      email,
      password,
      driver_license,
    });
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(400).json({ message: err.message });
    }
  }

  return res.status(201).send();
});

export { usersRoutes };
