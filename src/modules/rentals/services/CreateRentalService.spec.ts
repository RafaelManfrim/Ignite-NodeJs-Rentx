import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./CreateRentalService";

let createRentalService: CreateRentalService;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalService = new CreateRentalService(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  test("should be able to create a new rental", async () => {
    const rental = await createRentalService.execute({
      user_id: "1234",
      car_id: "999",
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
