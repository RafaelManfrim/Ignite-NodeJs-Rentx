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

  async findAvailable(category_id?: string, brand?: string, name?: string) {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}
