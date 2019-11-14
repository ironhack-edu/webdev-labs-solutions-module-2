
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// TO USE PARTIALS, WE HAVE TO REGISTER THEM
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static("public"));

// ROUTES

app.get('/', (req, res, next) => {
  res.render('index');
});

// ROUTE FOR GETTING ALL THE BEERS AND IT'S RENDERED ON "/BEERS" 
app.get("/beers", (req, res, next) => {
  punkAPI.getBeers() // .getBeers() is the method provided by punkAPI
  .then(responseFromDB => {
    // console.log("Response is:",  responseFromDB);
    // allBeers is the hbs file that's gonna be rendered, it comes from "views" folder
                        // "beers" is the name of a variable we will use in hbs file 
    res.render("allBeers", { beers: responseFromDB });
  })
  .catch(error => console.log(error));
});

// ROUTE FOR GETTING A RANDOM BEER AND IT'S RENDERED ON "/RANDOM-BEER" 

app.get("/random-beer", (req, res, next) => {
  punkAPI.getRandom() // .getRandom() is the method provided by punkAPI
  .then(beers => {
    // console.log("Random beer: ", beers[0]);
    const theBeer = beers[0];
    // console.log('the beer:', theBeer)
            // here we won't pack theBeer inside object to show in the .hbs file that we are using it a bit differently 
    res.render("random-beer", theBeer );
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log("App is running on port 3000 🎯"));
