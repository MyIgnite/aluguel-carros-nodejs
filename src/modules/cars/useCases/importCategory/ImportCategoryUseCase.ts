import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

interface IResolveImportCategory {
  type: string;
  name: string;
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

      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        const category = { name, description };

        categories.push(category);
      })
      .on("end", async () => {
        await deleteFile(file.path)        
        resolve(categories);
      })
      .on("error", (err) => {
        reject(err);
      });

    });
  }

  async execute(file: Express.Multer.File): Promise<IResolveImportCategory[]> {

    const importCategory = await this.loadImportsCategories(file);

    const categories = importCategory.filter(({name, description}) => name && description);

    if(!categories.length) {
      throw new Error("Empty or badly fomatted file!");
    }

    const receivedCategories = await Promise.all(

      categories.map(async ({ name, description }) => {
        
        const categoryExists = await this.categoriesRepository.findByName(name);
        
        if (categoryExists) {
          return { type: 'exists', name };
        }

        await this.categoriesRepository.create({ name, description });
        
        return { type: 'created', name };
      })
    );

    return receivedCategories;
  }
}

export { ImportCategoryUseCase };
