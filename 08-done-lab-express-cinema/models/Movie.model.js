const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: String,
    director: String,
    stars: [],
    image: String,
    description: String,
    showtimes: []
  },
  {
    timestamps: true
  }
);

const Movie = model('Movie', movieSchema);

// every movie will be saved in the "movies" collection in the database:

// model: Movie (capitalized)
// collection: movies (lowercase)

module.exports = Movie;
