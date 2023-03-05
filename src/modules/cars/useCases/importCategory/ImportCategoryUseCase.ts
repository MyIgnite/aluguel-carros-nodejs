import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { uploadCSV } from "@utils/file";
import { inject, injectable } from "tsyringe";

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

  async loadImportsCategories(file: Express.Multer.File) {
    const importCategory = await uploadCSV(file);
    
    const categories = await Promise.all(
      importCategory.map( async ({Nome, Descrição}) => {

        if(Nome && Descrição) {
          return {
            name: Nome.trim(),
            description: Descrição.trim()
          }
        } else {
          return null;
        }

      })
    )

    return categories;
  }

  async filteredCategories(categories: IImportCategory[]) {
    return categories.filter(category => category !== null);
  }

  async createCategories(categories: IImportCategory[]) {
    const processedCategories = await Promise.all(

      categories.map(async ({ name, description }) => {
        
        const categoryExists = await this.categoriesRepository.findByName(name);
        
        if (categoryExists) {
          return { type: 'exists', name };
        }

        await this.categoriesRepository.create({ name, description });
        
        return { type: 'created', name };
      })
    );

    return processedCategories;
  }

  async execute(file: Express.Multer.File): Promise<IResolveImportCategory[]> {

    const importedCategories = await this.loadImportsCategories(file);
    const categories = await this.filteredCategories(importedCategories);

    if(!categories.length) {
      throw new Error("Empty or badly fomatted file!");
    }

    const processedCategories = await this.createCategories(categories);

    return processedCategories;
  }
}

export { ImportCategoryUseCase };
