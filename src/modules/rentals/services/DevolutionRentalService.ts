import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../shared/errors/AppError";
import { ICarsRepository } from "../../cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
  rental_id: string;
}

@injectable()
export class DevolutionRentalService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ rental_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;
    let total = 0;

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
