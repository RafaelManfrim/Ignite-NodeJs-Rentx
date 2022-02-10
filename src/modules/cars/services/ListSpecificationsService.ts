import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../repositories/specifications/ISpecificationRepository";

@injectable()
class ListSpecificationsService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute() {
    const specifications = await this.specificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsService };
