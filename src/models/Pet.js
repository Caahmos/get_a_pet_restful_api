const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    avaiable: {
        type: Boolean
    },
    user: Object,
    adopter: Object,
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;