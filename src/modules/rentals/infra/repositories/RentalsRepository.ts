import { getRepository, Repository } from "typeorm";

import {
  ICreateRentalDTO,
  IRentalsRepository,
} from "../../repositories/IRentalsRepository";
import { Rental } from "../typeorm/model/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);
    return rental;
  }

  async findByOpenRentalCarId(car_id: string) {
    const openByCarId = await this.repository.findOne({ car_id });
    return openByCarId;
  }
  async findOpenRentalByUser(user_id: string) {
    const openByUser = await this.repository.findOne({ user_id });
    return openByUser;
  }
}
