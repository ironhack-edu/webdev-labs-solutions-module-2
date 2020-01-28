const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  name: String,
  password: String,
  profileImg: String,
  description: String,
  facebookId: String,
  role: {
    type: String,
    enum : ['BOSS', 'DEV', 'TA', 'STUDENT', 'GUEST'],
    default : 'GUEST'
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;