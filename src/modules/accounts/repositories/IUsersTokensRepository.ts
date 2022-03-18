import { UserTokens } from "../infra/typeorm/model/UserTokens";

export interface ICreateUsersTokensDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

export interface IUsersTokensRepository {
  create: (data: ICreateUsersTokensDTO) => Promise<UserTokens>;
}
