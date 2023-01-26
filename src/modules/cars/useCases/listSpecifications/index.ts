// import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

// const spefificationsRepository = SpecificationsRepository.getInstance();
const spefificationsRepository = null;

const listSpecificationsUseCase = new ListSpecificationsUseCase(spefificationsRepository);

const listSpecificationsController = new ListSpecificationController(listSpecificationsUseCase);

export { listSpecificationsController };
