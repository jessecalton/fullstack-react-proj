const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Exact same thing as below...
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

mongoose.model('users', userSchema);
