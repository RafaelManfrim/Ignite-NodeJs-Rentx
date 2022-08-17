import { inject, injectable } from "tsyringe";

import { User } from "../../infra/typeorm/model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
class UserProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export { UserProfileService };
