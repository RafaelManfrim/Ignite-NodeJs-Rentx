import { getRepository, Repository } from "typeorm";

import {
  ICreateUserTokensDTO,
  IUserTokensRepository,
} from "../../../repositories/IUserTokensRepository";
import { UserTokens } from "../model/UserTokens";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
