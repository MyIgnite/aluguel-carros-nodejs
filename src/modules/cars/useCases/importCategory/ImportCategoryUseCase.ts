import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository){}

  loadImportsCategories(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        const category = { name, description };

        categories.push(category);
      })
      .on("end", () => {
        resolve(categories);
      })
      .on("error", (err) => {
        reject(err);
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadImportsCategories(file);
    console.log("categories", categories);
  }
}

export { ImportCategoryUseCase };
