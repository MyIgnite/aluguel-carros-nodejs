import { Router } from "express";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (request, response) => {
  const { name, descripion } = request.body;

  categories.push({
    name,
    descripion
  });

  return response.status(201).send();
});

export { categoriesRoutes };
