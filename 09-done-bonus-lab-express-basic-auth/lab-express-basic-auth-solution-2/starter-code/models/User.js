const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the document schema
const userSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

// Create the model (connection) for the `users` collection
const User = mongoose.model('User', userSchema);

module.exports = User;
