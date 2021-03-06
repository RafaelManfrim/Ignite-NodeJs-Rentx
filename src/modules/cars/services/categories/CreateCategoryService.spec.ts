import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryService: CreateCategoryService;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory
    );
  });

  test("Should be able to create a new category", async () => {
    await createCategoryService.execute({
      name: "Category test",
      description: "Category description test",
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      "Category test"
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  test("Shouldn't able to create a existing category", async () => {
    await createCategoryService.execute({
      name: "Category test",
      description: "Category description test",
    });

    await expect(
      createCategoryService.execute({
        name: "Category test",
        description: "Category description test",
      })
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});
