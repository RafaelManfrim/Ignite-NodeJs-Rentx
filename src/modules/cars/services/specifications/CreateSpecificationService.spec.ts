import { AppError } from "../../../../errors/AppError";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationService } from "./CreateSpecificationService";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationService: CreateSpecificationService;

describe("Create specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationService = new CreateSpecificationService(
      specificationsRepositoryInMemory
    );
  });

  test("Should be able to create a new specification", async () => {
    await createSpecificationService.execute({
      name: "Specification test",
      description: "Specification description test",
    });

    const specificationCreated =
      await specificationsRepositoryInMemory.findByName("Specification test");

    expect(specificationCreated).toHaveProperty("id");
  });

  test("Shouldn't able to create a existing specification", () => {
    expect(async () => {
      await createSpecificationService.execute({
        name: "Specification test",
        description: "Specification description test",
      });

      await createSpecificationService.execute({
        name: "Specification test",
        description: "Specification description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
