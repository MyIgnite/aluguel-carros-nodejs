import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Hello World"});
});

app.post("/courses", (request, response) => {
  const { name } = request.body;

  return response.json({ name });
});

app.listen(9090, function() {
  console.log('Server started on http://localhost:9090/');
});