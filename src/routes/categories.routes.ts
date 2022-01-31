import { Router } from "express";
import multer from "multer";

import { CategoriesRepository } from "../modules/cars/repositories/categories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (req, res) => res.json(categoriesRepository.list()));

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.post("/import/", upload.single("file"), (req, res) => {
  const { file } = req;
  console.log(file);
  return res.send();
});

export { categoriesRoutes };
