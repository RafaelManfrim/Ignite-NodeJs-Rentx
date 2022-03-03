import { getRepository, Repository } from "typeorm";

import {
  ICarsRepository,
  ICreateCarDTO,
} from "../../../repositories/ICarsRepository";
import { Car } from "../model/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO) {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string) {
    const car = this.repository.findOne({ license_plate });
    return car;
  }
}
