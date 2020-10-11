import express from 'express';
import billing from './api/billing';
// Create a new express app instance
const app: express.Application = express();

app.use('/', billing);

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});