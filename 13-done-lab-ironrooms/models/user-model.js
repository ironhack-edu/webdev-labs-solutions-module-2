const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  fullName: String,
  // slack:
  slackID: String,
  // google
  googleID: String
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// this way is an option as well and it's the same as the one above
// module.exports = mongoose.model('User', userSchema);