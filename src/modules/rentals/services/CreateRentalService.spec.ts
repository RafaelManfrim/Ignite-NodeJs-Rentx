import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./CreateRentalService";

let createRentalService: CreateRentalService;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalService = new CreateRentalService(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  test("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car",
      description: "car test",
      brand: "brand test",
      category_id: "fake-category",
      daily_rate: 50,
      license_plate: "AAA-1111",
      fine_amount: 12,
    });

    const rental = await createRentalService.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  test("should not be able to create a new rental if there is another open for the same user", () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "1234",
        car_id: "123456789",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalService.execute({
        user_id: "1234",
        car_id: "6346756",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should not be able to create a new rental if there is another open for the same car", () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "53467",
        car_id: "213",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalService.execute({
        user_id: "3245",
        car_id: "213",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should not be able to create a new rental with invalid return time", () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "94203942",
        car_id: "5345",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
