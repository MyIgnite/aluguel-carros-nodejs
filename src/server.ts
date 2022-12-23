import express from 'express';

const app = express();

app.use(express.json());

app.listen(9090, function() {
  console.log('Server started on http://localhost:9090/');
});