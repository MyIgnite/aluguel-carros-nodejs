import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(9090, function() {
  console.log('Server started on http://localhost:9090');
});