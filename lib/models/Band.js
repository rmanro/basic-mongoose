const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        country: String
    },
    albums: [String]
});

module.exports = mongoose.model('Band', schema);