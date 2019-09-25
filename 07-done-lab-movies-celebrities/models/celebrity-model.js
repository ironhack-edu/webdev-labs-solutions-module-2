const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
}, 
{
  timestamps: true
})
const Celebrity = mongoose.model("Celebrity", celebritySchema );

// every celebrity will be saved in the "celebrities" collection in the database:

// model: Celebrity (capitalized)
// collection: celebrities (lowercase)

module.exports = Celebrity;