import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService";

let listAvailableCarsService: ListAvailableCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsService = new ListAvailableCarsService(
      carsRepositoryInMemory
    );
  });

  test("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description 1",
      daily_rate: 90,
      license_plate: "YTT-9033",
      fine_amount: 150,
      brand: "Car Brand",
      category_id: "123345534653463456",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description 2",
      daily_rate: 50,
      license_plate: "ADF-9742",
      fine_amount: 100,
      brand: "Car Brand",
      category_id: "123345534653463456",
    });

    const cars = await listAvailableCarsService.execute({});

    expect(cars).toEqual([car, car2]);
  });

  test("should be able to list available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name 1",
      description: "Car description name",
      daily_rate: 90,
      license_plate: "YTT-9033",
      fine_amount: 150,
      brand: "Car Brand",
      category_id: "123345534653463456",
    });

    await carsRepositoryInMemory.create({
      name: "Car name 2",
      description: "Car description name 2",
      daily_rate: 90,
      license_plate: "YTT-4236",
      fine_amount: 150,
      brand: "Car Brand 2",
      category_id: "53453",
    });

    const cars = await listAvailableCarsService.execute({ name: "Car name 1" });

    expect(cars).toEqual([car]);
  });

  test("should be able to list available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 90,
      license_plate: "TYF-2345",
      fine_amount: 150,
      brand: "Car Brand Test",
      category_id: "123345534653463456",
    });

    await carsRepositoryInMemory.create({
      name: "Car Brand 2",
      description: "Car description Brand 2",
      daily_rate: 90,
      license_plate: "RET-2326",
      fine_amount: 150,
      brand: "Car Brand Test 2",
      category_id: "53453",
    });

    const cars = await listAvailableCarsService.execute({
      brand: "Car Brand Test",
    });

    expect(cars).toEqual([car]);
  });

  test("should be able to list available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 90,
      license_plate: "TYF-2345",
      fine_amount: 150,
      brand: "Car Brand Test",
      category_id: "Categoria123",
    });

    await carsRepositoryInMemory.create({
      name: "Car Brand 2",
      description: "Car description Brand 2",
      daily_rate: 90,
      license_plate: "RET-2326",
      fine_amount: 150,
      brand: "Car Brand Test 2",
      category_id: "5345342352345",
    });

    const cars = await listAvailableCarsService.execute({
      category_id: "Categoria123",
    });

    expect(cars).toEqual([car]);
  });
});
