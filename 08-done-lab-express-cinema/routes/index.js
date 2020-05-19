const express = require('express');
const router  = express.Router();
const Movie   = require('../models/Movie');

/* GET home page */
// "/" => means "localhost:3000/" -> this is the root where our app is running
router.get('/', (req, res) => {
  // renders "index.hbs" and there we put the button to 
  // navigate to the "/movies" where we will display all the movies
  res.render('index');
});


// "/movies" => means "localhost:3000/movies"
router.get('/movies', (req, res) => {
  Movie
    // .find() is the method that will retrieve all the movie documents from the "movies" collection 
    // .find() will always give us back an ARRAY even of we have just one element in it
    .find()
    //                                        we are passing the array of objects from the DB to the hbs
    //                                                            |
    .then(moviesFromDB => res.render('movies-pages/movies', { moviesFromDB }))
    .catch(err => res.status(500).send(err));
});


// "/movie/:movieId" means "localhost:3000/movies/123lks5y0" being "123lks5y0" changeable and dependent on which movie details we want to see
// anything that comes after ":" in the URL can be taken through req.params
router.get('/movie/:movieId', (req, res) => {
  Movie
    // .findById() will always give us back an OBJECT (one element at the time)
    .findById(req.params.movieId)
    .then(theMovie => {
      console.log(theMovie);

      // we have to navigate to "movie.hbs" that is a page saved in the "movies-pages" folder 
      //                   we are passing the object from the DB to the hbs
      //                                    |
      res.render('movies-pages/movie', { theMovie } );
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
