var express = require('express');
var router = express.Router();

const Movie = require('../models/movie');

/* GET home page. */
router.get('/movies', function(req, res, next) {
  Movie.find({}, (err, moviesArray) => {
    if (err) { return next(err); }

    res.render('movies/index', {
      title: 'Movies',
      movies: moviesArray
    });
  });
});

router.get('/movies/new', function(req, res, next) {
  res.render('movies/new', {
    title: "Create a New Movie"
  });

});


router.post('/movies', function(req, res, next) {
  const theMovie = new Movie ({
    title: req.body.title,
    plot: req.body.plot,
    genre: req.body.genre,
  });

  theMovie.save ((err) => {
    if (err) {
      res.render('celebrities/new', {
        title: "Create a New Movie"
      });
    }
    else {
      res.redirect('/movies');
    }
  })
});

router.get('/movies/:id', function (req, res, next) {
  Movie.findOne({_id: req.params.id}, (err, theMovie) => {
    console.log(theMovie.title)
    if (err) { return next(err); }
    res.render('movies/show', {
      title: `${theMovie.title} Details`,
      movie: theMovie
    });
  });
});


router.get('/movies/:id/edit', function (req, res, next) {
  Movie.findOne({ _id: req.params.id }, (err, theMovie) => {
    if (err) { return next(err); }

    res.render('movies/edit', {
      title: `Edit ${theMovie.title}`,
      movie: theMovie
    });
  });
});


router.post('/movies/:id', function (req, res, next) {
  const updatedMovie = {
    title: req.body.title,
    plot: req.body.plot,
    genre: req.body.genre,
  }
  Movie.update({_id: req.params.id}, updatedMovie, (err, theMovie) => {
    if (err) {return next(err); }

    res.redirect('/movies');
  });
});

router.post('/movies/:id/delete', function(req, res, next) {
  Movie.findOne({ _id: req.params.id }, (err, theMovie) => {
    if (err) { return next(err); }

    theMovie.remove((err) => {
      if (err) { return next(err); }

      res.redirect('/movies');
    });
  });
});






module.exports = router;