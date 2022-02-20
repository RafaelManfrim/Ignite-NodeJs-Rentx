import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/UsersRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/categories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/categories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/specifications/ISpecificationRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/specifications/SpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
