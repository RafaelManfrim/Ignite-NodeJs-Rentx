import { Router } from "express";
import { container } from "tsyringe";

import { CreateCarService } from "../../../../modules/cars/services/cars/CreateCarService";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carRoutes = Router();

carRoutes.post("/", ensureAdmin, async (req, res) => {
  const carFromRequest: {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
  } = req.body;

  const createCarService = container.resolve(CreateCarService);

  const car = await createCarService.execute(carFromRequest);

  return res.json(car);
});

export { carRoutes };
