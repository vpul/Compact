const mongoose = require('mongoose');
const shortid = require('shortid');
const { isURL } = require('validator');

const urlSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  fullUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [isURL, 'Invalid URL'],
  },
});

module.exports = mongoose.model('User', urlSchema);
