import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";


/** NOTE TSyringe registerSingleton
 * 
 * Está sendo registrada uma classe chamada "CategoriesRepository" como uma 
 * instância única (singleton) no container de dependências, utilizando a 
 * interface "ICategoriesRepository". Isso significa que sempre que essa classe 
 * for requisitada pelo container, ele retornará a mesma instância, ao invés de 
 * criar uma nova a cada vez.
 * 
 * Isso pode ser útil para garantir que sejam compartilhados os mesmos dados 
 * entre diferentes partes do aplicativo, sem que haja a necessidade de recriar 
 * a instância da classe a cada vez que for necessário acessar esses dados. 
 * Também pode ser útil para garantir que sejam usadas as mesmas configurações 
 * ou estado da classe em todas as partes do aplicativo
 */

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);