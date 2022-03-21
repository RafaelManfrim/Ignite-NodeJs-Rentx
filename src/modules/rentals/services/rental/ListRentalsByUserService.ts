import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
export class ListRentalsByUserService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute(user_id: string) {
    const rentals = await this.rentalsRepository.findRentalsByUser(user_id);
    return rentals;
  }
}
