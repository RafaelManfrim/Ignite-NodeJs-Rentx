import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/categories/ICategoriesRepository";

@injectable()
class ListCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesService };
