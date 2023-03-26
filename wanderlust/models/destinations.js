const mongoose = require('mongoose');

const destinationsSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: 'Name is required'
  },
  placeCity: {
    type: String,
    required: 'City is required'
  },
  comments: {
    type: String
  },
  picture: {
    type: String
  }
});

module.exports = mongoose.model('Destinations', destinationsSchema);
