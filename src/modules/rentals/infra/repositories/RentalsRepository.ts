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
  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO) {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      total,
      end_date,
    });

    await this.repository.save(rental);
    return rental;
  }

  async findByOpenRentalCarId(car_id: string) {
    const openByCarId = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCarId;
  }
  async findOpenRentalByUser(user_id: string) {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }

  async findById(id: string) {
    const rental = await this.repository.findOne(id);
    return rental;
  }
}
