import { Car } from "../../infra/typeorm/model/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(category_id: string, brand: string, name: string) {
    return this.cars.filter((car) => {
      if (car.available === true) {
        if (brand) {
          return car.brand === brand;
        }
        if (name) {
          return car.name === name;
        }
        if (category_id) {
          return car.category_id === category_id;
        }
        return car;
      }
      return null;
    });
  }

  async findById(car_id: string) {
    return this.cars.find((car) => car.id === car_id);
  }

  async updateAvailable(id: string, available: boolean) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].available = available;
  }
}
