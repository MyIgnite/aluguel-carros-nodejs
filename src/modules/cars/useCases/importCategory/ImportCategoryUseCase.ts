import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

/** NOTE TSyringe
 * @injectable() é um decorador que é aplicado a uma classe para 
 * indicar que ela pode ser "injetada". 
 * 
 * A string é um token utilizado para identicar dentro do
 * container a classe que deve ser instanciada. 
 * "src/shared/container/index.ts"
 */

@injectable()
class ImportCategoryUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadImportsCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {

      console.log("file", file)


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
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on("error", (err) => {
        reject(err);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadImportsCategories(file);

    categories.map(async ({name, description}) => {
      const categoryAlreadyExists = !await this.categoriesRepository.findByName(name);

      if(categoryAlreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
