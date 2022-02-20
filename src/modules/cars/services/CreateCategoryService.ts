import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
