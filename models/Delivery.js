const mongoose = require('mongoose');

const DeliverySchema = mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    postcode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('delivery', DeliverySchema);
