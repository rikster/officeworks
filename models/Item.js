const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  }
});

module.exports = mongoose.model('item', ItemSchema);
