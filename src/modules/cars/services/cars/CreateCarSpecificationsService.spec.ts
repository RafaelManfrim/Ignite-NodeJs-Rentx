import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationsService } from "./CreateCarSpecificationsService";

let createCarSpecificationsService: CreateCarSpecificationsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationsService = new CreateCarSpecificationsService(
      carsRepositoryInMemory
    );
  });

  test("should be able to add a new specification to car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 12,
      fine_amount: 5,
      license_plate: "12345-abc",
      brand: "Brand test",
      category_id: "1",
    });
    const specifications_id = ["1", "2", "3", "4", "5", "6"];

    await createCarSpecificationsService.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  test("should not be able to add a new specification to nonexistent car", () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["1", "2", "3", "4", "5", "6"];

      await createCarSpecificationsService.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
