import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserService } from "./CreateUserService";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserService: CreateUserService;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  test("Should be able to create an user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "user@test.com",
      driver_license: "12345",
      password: "12345",
    };

    await createUserService.execute(user);
  });

  test("Shouldn't able to create an user with same email", () => {
    expect(async () => {
      await createUserService.execute({
        name: "User test",
        email: "user@test.com",
        driver_license: "12345",
        password: "12345",
      });

      await createUserService.execute({
        name: "User test 2",
        email: "user@test.com",
        driver_license: "12345",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
