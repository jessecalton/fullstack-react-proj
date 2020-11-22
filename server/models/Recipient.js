const mongoose = require('mongoose');
const { Schema } = mongoose;

// Our subdocument
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

// rather than register it w/ Mongoose, export it.

module.exports = recipientSchema;
