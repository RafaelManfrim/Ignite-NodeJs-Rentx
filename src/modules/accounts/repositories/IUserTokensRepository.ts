import { UserTokens } from "../infra/typeorm/model/UserTokens";

export interface ICreateUserTokensDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

export interface IUserTokensRepository {
  create: (data: ICreateUserTokensDTO) => Promise<UserTokens>;
}
