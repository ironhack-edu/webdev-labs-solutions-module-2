// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", async (req, res, next) => {
  try {
    const foundMovies = await Movie.find();
    res.render("movies/movies.hbs", { moviesList: foundMovies });
  } catch (error) {
    console.log(err);
  }
});

router.get("/movies/create", async (req, res, next) => {
  try {
    const celebsList = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebsList });
  } catch (error) {
    console.log(err);
  }
});

router.post("/movies/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    console.log(err);
    res.render("movies/new-movie.hbs");
  }
});

// router.get("/movies/:movieId", async (req, res, next) => {
//   try {
//     const movieId = req.params.movieId;
//     //
//     const foundMovie = await Movie.findById(movieId).populate("cast");
//     //
//     res.render("movies/movie-details", { foundMovie });
//     //
//   } catch (error) {
//     //
//     console.log(error);
//   }
// });

router.get("/movies/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      console.log(`foundMovie`, foundMovie);

      res.render("movies/movie-details", { foundMovie });
    });
});

module.exports = router;
