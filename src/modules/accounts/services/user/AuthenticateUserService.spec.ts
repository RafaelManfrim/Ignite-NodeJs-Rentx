import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { CreateUserService } from "./CreateUserService";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserService = new AuthenticateUserService(
      userRepositoryInMemory
    );
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  test("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "user@test.com",
      driver_license: "12345",
      password: "12345",
    };

    await createUserService.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  test("Should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User test",
        email: "user@password.test.com",
        driver_license: "12345",
        password: "12345",
      };

      await createUserService.execute(user);

      await authenticateUserService.execute({
        email: user.email,
        password: "fake-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
