const mongoose = require('mongoose');

const destinationsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  city: {
    type: String
    },
  comments: {
    type: String
  }
});

module.exports = mongoose.model('Destination', destinationsSchema);
