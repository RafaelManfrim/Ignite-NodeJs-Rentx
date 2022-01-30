import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/specifications/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecService = new CreateSpecificationService(specsRepository);
  createSpecService.execute({ name, description });

  return res.status(201).send();
});

specificationsRoutes.get("/", (req, res) => res.json(specsRepository.list()));

export { specificationsRoutes };
