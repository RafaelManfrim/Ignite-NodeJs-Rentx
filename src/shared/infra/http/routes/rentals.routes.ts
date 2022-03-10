import { Router } from "express";
import { container } from "tsyringe";

import { CreateRentalService } from "../../../../modules/rentals/services/CreateRentalService";

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

export { rentalRoutes };
