import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../repositories/categories/ICategoriesRepository";
import { CreateCategoryService } from "./CreateCategoryService";

interface IRequest {
  file: Express.Multer.File;
}

class ImportCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ file }: IRequest) {
    const stream = fs.createReadStream(file.path);

    const parseFile = parse({ delimiter: "/" });

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      const [name, description] = line;
      const createCategoryService = new CreateCategoryService(
        this.categoriesRepository
      );
      createCategoryService.execute({ name, description });
    });
  }
}

export { ImportCategoryService };
