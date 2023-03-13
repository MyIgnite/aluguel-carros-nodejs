import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";

/** NOTE Typeorm
 * Uma classe implementa uma interface e fornecer uma camada de abstração para 
 * acessar os dados de uma entidade no banco de dados.
 * 
 * Repository fornece uma estrutura básica para armazenar, recuperar e 
 * gerenciar dados da entidade passada como parâmetro.
 * 
 */

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
 
    const category = this.repository.create({
      name,
      description
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return await this.repository.find()
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
