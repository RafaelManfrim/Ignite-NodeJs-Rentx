import { container } from "tsyringe";

import { CategoriesRepository } from "../../modules/cars/repositories/categories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/categories/ICategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
