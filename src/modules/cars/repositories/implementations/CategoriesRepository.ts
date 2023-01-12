import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // Singleton

  /**
   * Singleton é um padrão de projeto que garante somente uma instância de uma classe. 
   * Fornece um ponto de acesso global para essa instância. 
   * É comumente usado para objetos que precisam manter um estado compartilhado em toda a aplicação.
   */

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    const instaceAlreadyExists = !CategoriesRepository.INSTANCE;
    
    if(instaceAlreadyExists) {
        CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      create_ate: new Date()
    })

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name );
    return category;
  }
}

export { CategoriesRepository };
