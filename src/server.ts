import express from 'express';

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World"})
})

app.listen(3333, function() {
  console.log('Server started on http://localhost:3333/');
});