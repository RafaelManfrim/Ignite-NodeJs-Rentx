import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../shared/errors/AppError";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest) {
    const carUnavailable = await this.rentalsRepository.findByOpenRentalCarId(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    const minimalRentalLenght = 24;

    if (compare < minimalRentalLenght) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
