import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";

import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";
import { ImportCategoryService } from "../modules/cars/services/ImportCategoriesService";
import { ListCategoriesService } from "../modules/cars/services/ListCategoriesService";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

categoriesRoutes.get("/", async (req, res) => {
  const listCategoriesService = container.resolve(ListCategoriesService);
  const categories = await listCategoriesService.execute();
  return res.json(categories);
});

categoriesRoutes.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const createCategoryService = container.resolve(CreateCategoryService);
    await createCategoryService.execute({ name, description });
    return res.status(201).send();
  } catch (err) {
    if (err.message === "Category already exists") {
      return res.status(400).json({ message: err.message });
    }
  }

  return res.send();
});

categoriesRoutes.post("/import/", upload.single("file"), async (req, res) => {
  const { file } = req;

  const importCategoryService = container.resolve(ImportCategoryService);
  await importCategoryService.execute({ file });

  return res.status(201).send();
});

export { categoriesRoutes };
