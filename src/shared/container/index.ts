
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { container } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ICsvRepository } from "@modules/cars/repositories/ICsvRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { CsvRepository } from "@modules/cars/repositories/implementations/CsvRepository";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

/** NOTE TSyringe registerSingleton
 * 
 * CategoriesRepository e ICategoriesRepository é usado como exemplos, mas o
 * container pode conter outras classes.
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

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICsvRepository>(
  "CsvRepository",
  CsvRepository
);