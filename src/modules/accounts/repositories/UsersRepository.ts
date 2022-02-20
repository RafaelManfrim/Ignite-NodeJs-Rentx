import { getRepository, Repository } from "typeorm";

import { User } from "../model/User";
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, email, password, username, driver_license } = data;
    const user = this.repository.create({
      name,
      email,
      password,
      username,
      driver_license,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
