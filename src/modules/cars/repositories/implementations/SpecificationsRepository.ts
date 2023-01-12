import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

   // Singleton

  /**
   * Singleton é um padrão de projeto que garante somente uma instância de uma classe. 
   * Fornece um ponto de acesso global para essa instância. 
   * É comumente usado para objetos que precisam manter um estado compartilhado em toda a aplicação.
   */
  
  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    const instaceAlreadyExists = !SpecificationsRepository.INSTANCE;
    
    if(instaceAlreadyExists) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      create_at: new Date()
    })

    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }
}

export { SpecificationsRepository };
