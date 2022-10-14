const express = require("express");
const PORT = 3000;

// Create an Express server appllication
const app = express();


// Static files like "/stylesheets/styles.css" and "/images/welcome.png"
// will be automatically served from the "public/" folder:
app.use(express.static("public"));

/*
Routes / endpoints: 
  / - 
  domain.com/about - About page
  domain.com/works - Works page
*/

//  GET  /   - Home page -   http://localhost:3000/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html"); // for sending files
});

//  GET  /about    - About page -   http://localhost:3000/about
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/views/about.html");
});

//  GET  /works    - Works page -   http://localhost:3000/works
app.get("/works", (req, res) => {
  res.sendFile(__dirname + "/public/views/works.html");
});


// This endpoint serves as a fallback if the requested endpoint/route does not exist
app.use((req, res) => {
  res.sendFile(__dirname + "/public/views/404.html");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});