import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";


describe("Criar um carro", () => { 
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Espero que cadastre um novo carro", async () => {
    const car = await createCarUseCase.execute({
      name: "Carro 1", 
      description: "Descrição do carro 1", 
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amout: 60,
      brand: "Marca 1",
      category_id: "category 1"
    });

    expect(car).toHaveProperty("id");
  });

  it("Espero que não cadastre um novo carro com a mesma placa", async () => {
    await createCarUseCase.execute({
      name: "Carro 1", 
      description: "Descrição do carro 1", 
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amout: 60,
      brand: "Marca 1",
      category_id: "category 1"
    });

    expect(async () => { 
      await createCarUseCase.execute({
        name: "Carro 2", 
        description: "Descrição do carro 2", 
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amout: 60,
        brand: "Marca 1",
        category_id: "category 1"
      })
    }).rejects.toBeInstanceOf(Error);

    expect(async () => { 
      await createCarUseCase.execute({
        name: "Carro 2", 
        description: "Descrição do carro 2", 
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amout: 60,
        brand: "Marca 1",
        category_id: "category 1"
      })
    }).rejects.toThrow("Car already exists!");
  });

  it("Espero que cadastre um novo carro com disponibilidade", async () => {
    const car = await createCarUseCase.execute({
      name: "Carro 3", 
      description: "Descrição do carro 3", 
      daily_rate: 100,
      license_plate: "BBB-8888",
      fine_amout: 60,
      brand: "Marca 3",
      category_id: "category 3"
    });

    expect(car.available).toBe(true);
  });

})