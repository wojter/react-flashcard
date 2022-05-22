const mongoose = require('mongoose');


// create schema, model doesn't allow walidation
const CardSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
    favourite: {
        type: Boolean,
    },
    known: {
        type: Number,
    }
})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;


