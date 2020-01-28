const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  director: String,
  stars: [],
  image: String,
  description: String,
  showtimes: []
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Movie = mongoose.model("Movie", movieSchema);

// every movie will be saved in the "movies" collection in the database:

// model: Movie (capitalized)
// collection: movies (lowercase)

module.exports = Movie;
