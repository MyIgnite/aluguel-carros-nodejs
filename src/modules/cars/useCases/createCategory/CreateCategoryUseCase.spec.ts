import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


describe("Criar categoria", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  const category = {
    name: "Categoria teste",
    description: "Categoria descrição teste"
  }

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("Espero que crie uma nova categoria", async () => {
    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated.name).toEqual(category.name);
    expect(categoryCreated.description).toEqual(category.description);
  });

  it("Espero que não crie uma categoria com o mesmo nome", async () => {
    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category))
      .rejects.toBeInstanceOf(Error);

    await expect(createCategoryUseCase.execute(category))
      .rejects.toThrow("Category Already exists!");
  });
})