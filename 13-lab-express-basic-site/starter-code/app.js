// Require Express
const express = require('express');

const port = 3001;

// Express server handling requests and responses
const app = express();

// middleware for static files
app.use(express.static('public'));

//Home
app.get('/', (request, response, next) => {
  response.sendFile(__dirname + '/public/views/index.html');
});

//About
app.get('/about', (request, response, next) => {
  response.sendFile(__dirname + '/public/views/about.html');
});

// Server Started
app.listen(port, () => {
  console.log(`My first app listening on port ${port}!`);
});
