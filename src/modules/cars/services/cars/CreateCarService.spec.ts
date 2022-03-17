import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarService } from "./CreateCarService";

let createCarService: CreateCarService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carsRepositoryInMemory);
  });

  test("should be able to create a new car", async () => {
    const car = await createCarService.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 12,
      fine_amount: 5,
      license_plate: "12345-abc",
      brand: "Brand test",
      category_id: "1",
    });

    expect(car).toHaveProperty("id");
  });

  test("Should not be able to create a car with exists license plate", async () => {
    await createCarService.execute({
      name: "Name car 1",
      description: "Description car 1",
      daily_rate: 12,
      fine_amount: 5,
      license_plate: "12345-abc",
      brand: "Brand test",
      category_id: "1",
    });

    await expect(
      createCarService.execute({
        name: "Name car 2",
        description: "Description car 2",
        daily_rate: 16,
        fine_amount: 10,
        license_plate: "12345-abc",
        brand: "Brand test 2",
        category_id: "2",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  test("Should be able to create a car with available true by default", async () => {
    const car = await createCarService.execute({
      name: "Name Availabe Car",
      description: "Description Car",
      daily_rate: 12,
      fine_amount: 5,
      license_plate: "abcd-123",
      brand: "Brand test",
      category_id: "1",
    });

    expect(car.available).toBe(true);
  });
});
