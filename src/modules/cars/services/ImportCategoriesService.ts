import { parse } from "csv-parse";
import fs from "fs";
import { container, inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { CreateCategoryService } from "./CreateCategoryService";

interface IRequest {
  file: Express.Multer.File;
}

@injectable()
class ImportCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ file }: IRequest) {
    const stream = fs.createReadStream(file.path);

    const parseFile = parse({ delimiter: "/" });

    stream.pipe(parseFile);

    parseFile
      .on("data", async (line) => {
        const [name, description] = line;
        const createCategoryService = container.resolve(CreateCategoryService);
        createCategoryService.execute({ name, description });
      })
      .on("end", () => {
        fs.promises.unlink(file.path);
      });
  }
}

export { ImportCategoryService };
