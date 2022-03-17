import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationsService } from "./CreateCarSpecificationsService";

let createCarSpecificationsService: CreateCarSpecificationsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationsService = new CreateCarSpecificationsService(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
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

    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification car",
      description: "Description specification car",
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationsService.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });

  test("should not be able to add a new specification to nonexistent car", async () => {
    const car_id = "123";
    const specifications_id = ["1", "2", "3", "4", "5", "6"];

    await expect(
      createCarSpecificationsService.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });
});
