import { getRepository, Repository } from "typeorm";

import { User } from "../model/User";
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password, driver_license }: ICreateUserDTO) {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });
    console.log(user);

    await this.repository.save(user);
  }
}

export { UsersRepository };
