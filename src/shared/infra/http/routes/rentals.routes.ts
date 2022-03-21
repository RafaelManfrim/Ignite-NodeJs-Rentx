import { Router } from "express";
import { container } from "tsyringe";

import { CreateRentalService } from "../../../../modules/rentals/services/rental/CreateRentalService";
import { DevolutionRentalService } from "../../../../modules/rentals/services/rental/DevolutionRentalService";
import { ListRentalsByUserService } from "../../../../modules/rentals/services/rental/ListRentalsByUserService";

const rentalRoutes = Router();

rentalRoutes.post("/", async (req, res) => {
  const { id } = req.user;
  const { car_id, expected_return_date } = req.body;
  const createRentalService = container.resolve(CreateRentalService);
  const rental = await createRentalService.execute({
    car_id,
    user_id: id,
    expected_return_date,
  });
  return res.status(201).json(rental);
});

rentalRoutes.post("/devolution/:id", async (req, res) => {
  const devolutionRentalService = container.resolve(DevolutionRentalService);

  const { id: user_id } = req.user;
  const { id: rental_id } = req.params;

  const rental = await devolutionRentalService.execute({ rental_id, user_id });
  return res.json(rental);
});

rentalRoutes.get("/user", async (req, res) => {
  const { id } = req.user;
  const listRentalsByUserService = container.resolve(ListRentalsByUserService);
  const rentals = await listRentalsByUserService.execute(id);
  return res.json(rentals);
});

export { rentalRoutes };
