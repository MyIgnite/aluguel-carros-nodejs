import express from "express";

import swaggerUi from "swagger-ui-express";

import swaggwerFile from "./swagger.json";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggwerFile));

app.use(router);

app.listen(9090, function() {
  console.log('Server started on http://localhost:9090');
});