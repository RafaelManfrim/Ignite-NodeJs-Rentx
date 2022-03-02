import { Router } from "express";
import { container } from "tsyringe";

import { CreateSpecificationService } from "../../../../modules/cars/services/specifications/CreateSpecificationService";
import { ListSpecificationsService } from "../../../../modules/cars/services/specifications/ListSpecificationsService";

const specificationsRoutes = Router();

specificationsRoutes.get("/", async (req, res) => {
  const listSpecificationsService = container.resolve(
    ListSpecificationsService
  );
  const specifications = await listSpecificationsService.execute();
  return res.json(specifications);
});

specificationsRoutes.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const createSpecService = container.resolve(CreateSpecificationService);
    await createSpecService.execute({ name, description });
  } catch (err) {
    if (err.message === "Specification already exists") {
      return res.status(400).json({ message: err.message });
    }
  }

  return res.status(201).send();
});

export { specificationsRoutes };
