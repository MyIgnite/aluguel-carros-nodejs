import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

/** NOTE TSyringe
 * @injectable() é um decorador que é aplicado a uma classe para 
 * indicar que ela pode ser "injetada". 
 * 
 * A string é um token utilizado para identicar dentro do
 * container a classe que deve ser instanciada. 
 * "src/shared/container/index.ts"
 */

@injectable()
class ListCategoriesUseCase {

  constructor (
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    if(!categories.length) {
      throw new Error("No existing category!");
    }

    return categories;
  }
}

export { ListCategoriesUseCase };
