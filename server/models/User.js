const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Exact same thing as below...
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

mongoose.model('users', userSchema);
