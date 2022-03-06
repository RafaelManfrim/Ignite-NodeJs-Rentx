import { CarImage } from "../infra/typeorm/model/CarImage";

export interface ICarsImagesRepository {
  create: (car_id: string, image_name: string) => Promise<CarImage>;
}
