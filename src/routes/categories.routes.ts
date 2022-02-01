import { Router } from "express";
import multer from "multer";

import { CategoriesRepository } from "../modules/cars/repositories/categories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";
import { ImportCategoryService } from "../modules/cars/services/ImportCategoriesService";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (req, res) => res.json(categoriesRepository.list()));

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  try {
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );
    createCategoryService.execute({ name, description });
  } catch (err) {
    if (err.message === "Category already exists") {
      return res.status(400).json({ message: err.message });
    }
  }

  return res.status(201).send();
});

categoriesRoutes.post("/import/", upload.single("file"), (req, res) => {
  const { file } = req;

  const importCategoryService = new ImportCategoryService(categoriesRepository);
  importCategoryService.execute({ file });

  return res.send();
});

export { categoriesRoutes };
