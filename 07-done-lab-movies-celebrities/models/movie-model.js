const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
}, 
{
  timestamps: true
})
const Movie = mongoose.model("Movie", movieSchema );

// every movie will be saved in the "movies" collection in the database:

// model: Movie (capitalized)
// collection: movies (lowercase)

module.exports = Movie;