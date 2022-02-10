import { Router } from "express";
import { container } from "tsyringe";

import { SpecificationsRepository } from "../modules/cars/repositories/specifications/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specsRepository = () => new SpecificationsRepository();

specificationsRoutes.get("/", (req, res) => res.json(specsRepository().list()));

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  try {
    const createSpecService = container.resolve(CreateSpecificationService);
    createSpecService.execute({ name, description });
  } catch (err) {
    if (err.message === "Specification already exists") {
      return res.status(400).json({ message: err.message });
    }
  }

  return res.status(201).send();
});

export { specificationsRoutes };
