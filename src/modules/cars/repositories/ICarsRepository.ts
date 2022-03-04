import { Car } from "../infra/typeorm/model/Car";

export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
  findAvailable: (
    category_id?: string,
    brand?: string,
    name?: string
  ) => Promise<Car[]>;
}
