import { Router } from "express";
import { container } from "tsyringe";

import { CreateCarService } from "../../../../modules/cars/services/cars/CreateCarService";

const carRoutes = Router();

carRoutes.post("/", async (req, res) => {
  const {
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  } = req.body;

  const createCarService = container.resolve(CreateCarService);

  const car = await createCarService.execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  });

  return res.json(car);
});

export { carRoutes };
