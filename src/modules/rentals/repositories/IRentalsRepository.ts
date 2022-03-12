import { Rental } from "../infra/typeorm/model/Rental";

export interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export interface IRentalsRepository {
  create: (data: ICreateRentalDTO) => Promise<Rental>;
  findByOpenRentalCarId: (car_id: string) => Promise<Rental>;
  findOpenRentalByUser: (user_id: string) => Promise<Rental>;
  findById: (rental_id: string) => Promise<Rental>;
}
