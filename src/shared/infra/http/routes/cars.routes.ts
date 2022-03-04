import { Router } from "express";
import { container } from "tsyringe";

import { CreateCarService } from "../../../../modules/cars/services/cars/CreateCarService";
import { ListAvailableCarsService } from "../../../../modules/cars/services/cars/ListAvailableCarsService";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

carRoutes.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
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

carRoutes.get("/available/", async (req, res) => {
  const { brand, name, category_id } = req.query;
  const listAvailableCarsService = container.resolve(ListAvailableCarsService);

  const cars = await listAvailableCarsService.execute({
    brand: brand as string,
    name: name as string,
    category_id: category_id as string,
  });

  return res.json(cars);
});

export { carRoutes };
