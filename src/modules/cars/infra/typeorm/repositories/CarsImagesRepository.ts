import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";
import { CarImage } from "../model/CarImage";

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string) {
    const carImage = await this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}
