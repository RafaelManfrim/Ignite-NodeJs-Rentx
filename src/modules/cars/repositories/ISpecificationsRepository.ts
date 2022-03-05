import { Specification } from "../infra/typeorm/model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByIds: (ids: string[]) => Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
